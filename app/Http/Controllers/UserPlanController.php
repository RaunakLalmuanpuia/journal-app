<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\DriveResource;

class UserPlanController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $plans = $user->plans()
            ->withPivot(['starts_at', 'ends_at', 'status', 'created_at'])
            ->get()
            ->map(function ($plan) use ($user) {
                // Fetch resources specifically for this user and plan
                $resources = DriveResource::where('user_id', $user->id)
                    ->where('plan_id', $plan->id)
                    ->get();

                // specific logic to find the "Main" drive folder link if it exists
                // Assuming the first resource or a specific type is the main folder
                $mainResource = $resources->first();

                return [
                    'id' => $plan->id,
                    'name' => $plan->name,
                    'planType' => strtolower($plan->type), // 'free', 'pro', 'enterprise'
                    'status' => $plan->pivot->status, // 'active', 'claimed', 'pending'
                    'claimedAt' => $plan->pivot->created_at->format('M d, Y'),
                    'starts_at' => $plan->pivot->starts_at,
                    'resources' => $resources, // The list of files/sheets
                    'driveUrl' => $mainResource ? $mainResource->link : null,
                ];
            });

        return Inertia::render('Backend/Products/Index', [
            'activeClaims' => $plans
        ]);
    }
}
