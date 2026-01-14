<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->hasRole('Admin')) {

            // Fetch real statistics
            $stats = [
                'total_users'  => User::count(),
                // Example: Users active in last 30 days. Adjust logic as needed.
                'active_users' => User::where('updated_at', '>=', now()->subDays(30))->count(),
                'blog_posts'   => 5, // Replace with: Post::count()
                'revenue'      => '$12,345', // Replace with real payment calculation
            ];

            return Inertia::render('Backend/Dashboard/Admin', [
                'stats' => $stats
            ]);
        }

        return Inertia::render('Backend/Dashboard',[]);
    }
}
