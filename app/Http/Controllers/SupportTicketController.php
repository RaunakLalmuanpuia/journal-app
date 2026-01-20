<?php

namespace App\Http\Controllers;

use App\Models\SupportTicket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

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
}
