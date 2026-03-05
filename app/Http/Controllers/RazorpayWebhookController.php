<?php

namespace App\Http\Controllers;

use App\Jobs\ProvisionUserDrive;
use App\Models\Payment;
use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class RazorpayWebhookController extends Controller
{
    // RazorpayWebhookController.php - return 200 always after signature check
    // Razorpay retries on anything non-2xx. Only reject on bad signature.

    public function handle(Request $request)
    {
        $webhookSecret    = config('services.razorpay.webhook_secret');
        $webhookSignature = $request->header('X-Razorpay-Signature');
        $rawBody          = $request->getContent();

        $expectedSignature = hash_hmac('sha256', $rawBody, $webhookSecret);

        if (!hash_equals($expectedSignature, (string) $webhookSignature)) {
            return response()->json(['error' => 'Invalid signature.'], 400); // ✅ 400 is correct here
        }

        $payload = $request->json()->all();
        $event   = $payload['event'] ?? null;

        try {
            match ($event) {
                'payment.captured' => $this->handlePaymentCaptured($payload),
                'payment.failed'   => $this->handlePaymentFailed($payload),
                default            => null,
            };
        } catch (\Exception $e) {
            // Log but still return 200 — prevents Razorpay retrying an already-processed event
            \Log::error('Razorpay webhook error: ' . $e->getMessage(), ['event' => $event]);
        }

        return response()->json(['status' => 'ok']); // always 200 after signature passes
    }

    // RazorpayWebhookController.php - handlePaymentCaptured()
    private function handlePaymentCaptured(array $payload): void
    {
        $paymentEntity = $payload['payload']['payment']['entity'];
        $orderId       = $paymentEntity['order_id'];
        $paymentId     = $paymentEntity['id'];

        DB::transaction(function () use ($orderId, $paymentId) {
            $payment = Payment::where('razorpay_order_id', $orderId)
                ->lockForUpdate()
                ->first();

            if (!$payment || $payment->status === 'paid') {
                return;
            }

            $payment->update([
                'razorpay_payment_id' => $paymentId,
                'status'              => 'paid',
            ]);

            $user    = $payment->user;
            $proPlan = Plan::where('type', 'pro')->firstOrFail();

            $user->plans()->syncWithoutDetaching([
                $proPlan->id => ['status' => 'active', 'starts_at' => now()],
            ]);

            ProvisionUserDrive::dispatch($user, $proPlan);
        });
    }

    private function handlePaymentFailed(array $payload): void
    {
        $paymentEntity = $payload['payload']['payment']['entity'];
        $orderId       = $paymentEntity['order_id'];

        Payment::where('razorpay_order_id', $orderId)
            ->where('status', 'created')          // don't overwrite a paid record
            ->update(['status' => 'failed']);
    }
}
