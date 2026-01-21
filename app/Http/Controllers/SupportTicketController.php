<?php

namespace App\Http\Controllers;

use App\Models\SupportTicket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
class SupportTicketController extends Controller
{
    /**
     * Display the help & support page.
     */
    public function index()
    {
        return Inertia::render('Backend/Support/Index',[]);
        // Ensure your React file is inside resources/js/Pages/Support/Index.jsx
    }

    /**
     * Store a newly created support ticket in storage.
     */
    public function store(Request $request)
    {
        // 1. Validate the request
        $validated = $request->validate([
            'subject' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:50'],
            'priority' => ['nullable', 'string', 'max:20'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        // 2. Create the ticket using the relationship
        // This automatically sets the 'user_id' based on the logged-in user
        $request->user()->supportTickets()->create([
            'subject' => $validated['subject'],
            'category' => $validated['category'],
            'priority' => $validated['priority'] ?? 'low',
            'message' => $validated['message'],
            'status' => 'open',
        ]);

        // 3. Redirect back (Inertia will handle the success state/flash message)
        return Redirect::back();
    }

    public function adminIndex(Request $request)
    {
        $query = SupportTicket::query()->with('user');

        // 1. Search Filter (Subject, Message, or User Name/Email)
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('subject', 'like', "%{$search}%")
                    ->orWhere('message', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($userQuery) use ($search) {
                        $userQuery->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    });
            });
        }

        // 2. Status Filter
        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        // 3. Fetch Data
        $tickets = $query->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Backend/Support/Admin/Index', [
            'tickets' => $tickets,
            'filters' => $request->only(['search', 'status']),
            // Optional: Pass distinct statuses for the dropdown
            'statuses' => ['Open', 'Pending', 'Resolved', 'Closed'],
        ]);
    }

    public function updateStatus(Request $request, SupportTicket $ticket): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|string|in:Open,Pending,Resolved,Closed',
        ]);

        $ticket->update(['status' => $validated['status']]);

        return back()->with('success', 'Ticket status updated successfully.');
    }
}
