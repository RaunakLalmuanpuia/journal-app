<?php

namespace App\Http\Controllers;

use App\Models\EnterpriseInquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
class EnterpriseInquiryController extends Controller
{

    public function index(Request $request)
    {
        $query = EnterpriseInquiry::query();

        // Apply Search Filter if exists
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('company', 'like', "%{$search}%")
                    ->orWhere('contact_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Fetch inquiries with pagination and preserve query strings
        $inquiries = $query->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Backend/Inquiries/Index', [
            'inquiries' => $inquiries,
            'filters' => $request->only(['search']), // Pass search term back to view
        ]);
    }

    public function store(Request $request)
    {
        // 1. Validate the request
        $validated = $request->validate([
            'company' => 'required|string|max:255',
            'contact_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'team_size' => 'required|string|max:50',
            'requirements' => 'required|string',
            'budget' => 'nullable|string|max:255',
        ]);

        // 2. Attach User ID if logged in
        if (Auth::check()) {
            $validated['user_id'] = Auth::id();
        }

        // 3. Store the inquiry
        EnterpriseInquiry::create($validated);

        // 4. Redirect back with success message (Inertia handles this flash)
        return Redirect::back()->with('success', 'Inquiry submitted successfully! We will reach out soon.');
    }

}
