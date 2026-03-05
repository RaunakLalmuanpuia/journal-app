<?php

namespace App\Http\Controllers;

use App\Jobs\ProvisionUserDrive;
use App\Models\Payment;
use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Razorpay\Api\Api;
use Illuminate\Support\Facades\DB;

class RazorpayController extends Controller
{
    private Api $api;

    public function __construct()
    {
        $this->api = new Api(
            config('services.razorpay.key_id'),
            config('services.razorpay.key_secret')
        );
    }

    public function createOrder(Request $request)
    {
        $user = Auth::user();

        if ($user->plans()->where('type', 'pro')->wherePivot('status', 'active')->exists()) {
            return response()->json(['error' => 'Pro plan already active.'], 422);
        }

        // ✅ Guard: ensure Drive tokens exist before accepting payment
        if (!$user->googleAccount || empty($user->googleAccount->refresh_token)) {
            return response()->json([
                'error' => 'Please sign out and sign back in with Google to grant Drive access before upgrading.',
            ], 422);
        }

        $proPlan  = Plan::where('type', 'pro')->firstOrFail();
        $amount   = (int) config('services.razorpay.amount');
        $currency = config('services.razorpay.currency', 'INR');

        $order = $this->api->order->create([
            'amount'          => $amount,
            'currency'        => $currency,
            'receipt'         => 'rcpt_' . $user->id . '_' . time(),
            'payment_capture' => 1,
        ]);

        Payment::create([
            'user_id'           => $user->id,
            'plan_id'           => $proPlan->id,
            'razorpay_order_id' => $order->id,
            'amount'            => $amount / 100,
            'currency'          => $currency,
            'status'            => 'created',
        ]);

        return response()->json([
            'order_id' => $order->id,
            'amount'   => $amount,
            'currency' => $currency,
            'key_id'   => config('services.razorpay.key_id'),
            'name'     => $user->name,
            'email'    => $user->email,
        ]);
    }

    public function verifyPayment(Request $request)
    {
        $request->validate([
            'razorpay_order_id'   => 'required|string',
            'razorpay_payment_id' => 'required|string',
            'razorpay_signature'  => 'required|string',
        ]);

        try {
            $this->api->utility->verifyPaymentSignature([
                'razorpay_order_id'   => $request->razorpay_order_id,
                'razorpay_payment_id' => $request->razorpay_payment_id,
                'razorpay_signature'  => $request->razorpay_signature,
            ]);
        } catch (\Exception $e) {
            Payment::where('razorpay_order_id', $request->razorpay_order_id)
                ->update(['status' => 'failed']);

            return response()->json(['error' => 'Payment verification failed.'], 422);
        }

        // ✅ Atomic lock — webhook and verifyPayment can't both provision
        $activated = $this->activateIfNotAlready(
            $request->razorpay_order_id,
            $request->razorpay_payment_id,
            $request->razorpay_signature
        );

        // Already handled by webhook — just redirect, user is already provisioned
        return response()->json(['redirect_url' => route('dashboard')]);
    }

    // RazorpayController.php - activateIfNotAlready()
    private function activateIfNotAlready(string $orderId, string $paymentId, string $signature): bool
    {
        return DB::transaction(function () use ($orderId, $paymentId, $signature) {
            $payment = Payment::where('razorpay_order_id', $orderId)
                ->lockForUpdate()
                ->first();

            if (!$payment || $payment->status === 'paid') {
                return false;
            }

            $payment->update([
                'razorpay_payment_id' => $paymentId,
                'razorpay_signature'  => $signature,
                'status'              => 'paid',
            ]);

            $user    = $payment->user;
            $proPlan = Plan::where('type', 'pro')->firstOrFail();

            $user->plans()->syncWithoutDetaching([
                $proPlan->id => ['status' => 'active', 'starts_at' => now()],
            ]);

            ProvisionUserDrive::dispatch($user, $proPlan);

            return true;
        });
    }
}
