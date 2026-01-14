<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Plan;
use Illuminate\Support\Collection;

class UserPlanSeeder extends Seeder
{
    public function run(): void
    {
        $plans = Plan::all();

        // 🔹 Only normal users (exclude admin)
        $users = User::where('id', '!=', 1)
            ->limit(5)
            ->get();

        foreach ($users as $user) {

            // 🔹 Each user gets 1 to N plans randomly
            $randomPlans = $plans->random(rand(1, $plans->count()));

            foreach ($randomPlans as $plan) {

                $endsAt = $plan->duration_days
                    ? now()->addDays($plan->duration_days)
                    : null;

                $user->plans()->syncWithoutDetaching([
                    $plan->id => [
                        'starts_at' => now(),
                        'ends_at'   => $endsAt,
                        'status'    => 'active',
                    ],
                ]);
            }
        }
    }
}
