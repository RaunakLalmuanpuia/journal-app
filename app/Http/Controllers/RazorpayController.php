<?php

namespace App\Http\Controllers;

use App\Jobs\ProvisionUserDrive;
use App\Models\Payment;
use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Razorpay\Api\Api;

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

        // 1. Verify HMAC signature
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

        // 2. Mark payment paid
        Payment::where('razorpay_order_id', $request->razorpay_order_id)
            ->update([
                'razorpay_payment_id' => $request->razorpay_payment_id,
                'razorpay_signature'  => $request->razorpay_signature,
                'status'              => 'paid',
            ]);

        $user    = Auth::user();
        $proPlan = Plan::where('type', 'pro')->firstOrFail();

        // 3. Activate Pro plan
        $user->plans()->syncWithoutDetaching([
            $proPlan->id => [
                'status'    => 'active',
                'starts_at' => now(),
            ],
        ]);

        // 4. ✅ Dispatch provisioning directly — no Google OAuth redirect needed
        // Tokens were already saved at login
        ProvisionUserDrive::dispatch($user, $proPlan);

        return response()->json([
            'redirect_url' => route('dashboard'),
        ]);
    }
}
