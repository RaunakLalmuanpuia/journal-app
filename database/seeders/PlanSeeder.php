<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Plan;

class PlanSeeder extends Seeder
{
    public function run(): void
    {
        Plan::updateOrCreate(
            ['type' => 'free'],
            [
                'name' => 'Free',
                'price' => 0,
                'duration_days' => null,
                'features' => [
                    'basic_access',
                    'limited_reports'
                ],
            ]
        );

        Plan::updateOrCreate(
            ['type' => 'pro'],
            [
                'name' => 'Pro',
                'price' => 999,
                'duration_days' => 30,
                'features' => [
                    'basic_access',
                    'advanced_reports',
                    'priority_support'
                ],
            ]
        );

        Plan::updateOrCreate(
            ['type' => 'enterprise'],
            [
                'name' => 'Enterprise',
                'price' => 0,
                'duration_days' => 365,
                'features' => [
                    'all_features',
                    'dedicated_support',
                    'custom_integrations'
                ],
            ]
        );
    }
}
