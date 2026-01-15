<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Plan;
use App\Models\Payment;
use App\Models\DriveResource;
use Illuminate\Support\Str;

class UserPlanSeeder extends Seeder
{
    public function run(): void
    {
        $plans = Plan::all();

        // Exclude admin
        $users = User::where('email', '!=', 'admin@mail.com')->get();

        foreach ($users as $user) {

            // Randomly assign 1 or 2 plans
            $assignedPlans = $plans->random(rand(1, $plans->count()));

            foreach ($assignedPlans as $plan) {

                // Attach plan
                $user->plans()->syncWithoutDetaching([
                    $plan->id => [
                        'starts_at' => now(),
                        'ends_at' => $plan->duration_days
                            ? now()->addDays($plan->duration_days)
                            : null,
                        'status' => 'active',
                    ],
                ]);

                /* ------------------------
                 | PAID PLAN → PAYMENT
                 |------------------------*/
                if ($plan->price > 0) {
                    Payment::create([
                        'user_id' => $user->id,
                        'plan_id' => $plan->id,
                        'amount' => $plan->price,
                        'currency' => 'INR',
                        'gateway' => 'razorpay',
                        'transaction_id' => 'TXN-' . Str::upper(Str::random(10)),
                        'status' => 'paid',
                        'paid_at' => now(),
                    ]);
                }

                /* ------------------------
                 | DRIVE RESOURCE
                 |------------------------*/
                DriveResource::create([
                    'user_id' => $user->id,
                    'plan_id' => $plan->id,
                    'type' => $plan->price == 0 ? 'sheet' : 'folder',
                    'google_file_id' => 'mock_' . Str::uuid(),
                    'name' => $plan->price == 0
                        ? "{$user->name} Free Sheet"
                        : "{$user->name} Pro Folder",
                    'status' => 'active',
                ]);
            }
        }
    }
}
