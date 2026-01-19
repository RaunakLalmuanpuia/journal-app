<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $query = User::query()->with('roles');

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->filled('role')) {
            $query->role($request->input('role'));
        }

        $users = $query->latest()
            ->paginate(10)
            ->withQueryString()
            ->through(fn ($user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'avatar' => $user->avatar,
                'status' => $user->status, // Returns 'Active' or 'Inactive'
                'mobile' => $user->mobile,
                'created_at' => $user->created_at->format('d/m/Y'),
                'roles' => $user->roles->pluck('name'),
            ]);

        return Inertia::render('Backend/Users/Index', [
            'users' => $users,
            'roles' => Role::pluck('name'), // Will return ['Admin', 'User']
            'filters' => $request->only(['search', 'role']),
        ]);
    }

    public function updateRole(Request $request, User $user)
    {
        $request->validate([
            'role' => 'required|exists:roles,name',
        ]);

        if ($user->id === auth()->id()) {
            return back()->with('error', 'You cannot change your own role.');
        }

        // Syncs the new role (Admin or User)
        $user->syncRoles($request->role);

        return back()->with('success', 'User role updated successfully.');
    }

    public function toggleStatus(User $user)
    {
        if ($user->id === auth()->id()) {
            return back()->with('error', 'You cannot deactivate your own account.');
        }

        // Toggle strict Capitalized values
        $newStatus = $user->status === 'Active' ? 'Inactive' : 'Active';

        $user->update(['status' => $newStatus]);

        return back()->with('success', "User marked as {$newStatus}.");
    }
}
