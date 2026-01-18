<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use App\Models\User;
use App\Models\UserPlan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\Builder;

class AdminPlanController extends Controller
{
    /**
     * Display a listing of users and their current subscription status.
     */
    public function index(Request $request)
    {
        $planTypes = Plan::select('type')->distinct()->pluck('type');

        // Query the SUBSCRIPTIONS, not the Users
        $subscriptions = UserPlan::query()
            ->with(['user', 'plan']) // Eager load relationships
            // 1. Search (Search by User's name/email)
            ->when($request->search, function (Builder $query, $search) {
                $query->whereHas('user', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            // 2. Filter by Plan Type
            ->when($request->type, function (Builder $query, $type) {
                $query->whereHas('plan', function ($q) use ($type) {
                    $q->where('type', $type);
                });
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString()
            ->through(function ($subscription) {
                // Determine if THIS specific subscription is active
                $isActive = $subscription->status === 'active' &&
                    ($subscription->ends_at === null || $subscription->ends_at > now());

                return [
                    'id' => $subscription->id, // Subscription ID (not User ID)
                    'user_id' => $subscription->user->id,
                    'user_name' => $subscription->user->name,
                    'user_email' => $subscription->user->email,
                    'user_avatar' => $subscription->user->avatar,

                    'plan_name' => $subscription->plan->name,
                    'plan_type' => $subscription->plan->type,

                    'status' => $subscription->status, // active, expired, cancelled
                    'is_active' => $isActive, // Boolean for UI logic
                    'ends_at' => $subscription->ends_at,
                    'created_at' => $subscription->created_at,
                ];
            });

        return Inertia::render('Backend/Plan/Index', [
            'subscriptions' => $subscriptions, // Renamed from 'users' to 'subscriptions'
            'plan_types' => $planTypes,
            'filters' => $request->only(['search', 'type']),
        ]);
    }

    /**
     * Display detailed plan history for a specific user.
     */
    public function show(User $user)
    {
        // Load plan history with pivot details and payments
        $user->load([
            'plans' => function ($q) {
                $q->orderBy('user_plans.created_at', 'desc');
            },
            'payments' => function ($q) {
                $q->latest();
            }
        ]);

        return Inertia::render('Backend/Plan/Show', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'avatar' => $user->avatar,
                'joined_at' => $user->created_at->format('d M Y'),
            ],
            // Map plans to include easy-to-read pivot data
            'plan_history' => $user->plans->map(function ($plan) {
                return [
                    'id' => $plan->id, // Plan ID
                    'name' => $plan->name,
                    'type' => $plan->type,
                    'price' => $plan->price,
                    'pivot_id' => $plan->pivot->id, // UserPlan ID (useful for actions like cancel)
                    'status' => $plan->pivot->status,
                    'starts_at' => $plan->pivot->starts_at,
                    'ends_at' => $plan->pivot->ends_at,
                    'is_active' => $plan->pivot->status === 'active' &&
                        ($plan->pivot->ends_at === null || $plan->pivot->ends_at > now()),
                ];
            }),
            'payments' => $user->payments,
        ]);
    }
}
