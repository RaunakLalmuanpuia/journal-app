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
                // 1. Eager load the 'files' relationship defined in your DriveResource model
                $resources = DriveResource::with('files')
                    ->where('user_id', $user->id)
                    ->where('plan_id', $plan->id)
                    ->get();

                // 2. Identify the Main Folder (DriveResource)
                $mainFolder = $resources->firstWhere('type', 'folder') ?? $resources->first();

                // 3. Extract/Flatten all DriveFiles from the resources
                // This gets every file inside the folder(s) associated with this plan
                $allFiles = $resources->flatMap(function ($resource) {
                    return $resource->files;
                });

                return [
                    'id' => $plan->id,
                    'name' => $plan->name,
                    'planType' => strtolower($plan->type),
                    'status' => $plan->pivot->status,
                    'claimedAt' => $plan->pivot->created_at->format('M d, Y'),
                    'starts_at' => $plan->pivot->starts_at,

                    // Pass the flattened files to the frontend
                    'files' => $allFiles,

                    // Link to the main parent folder
                    'driveUrl' => $mainFolder ? $mainFolder->link : null,
                ];
            });

        return Inertia::render('Backend/Products/Index', [
            'activeClaims' => $plans
        ]);
    }
}
