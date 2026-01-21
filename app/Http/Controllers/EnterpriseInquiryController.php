<?php

namespace App\Http\Controllers;

use App\Models\EnterpriseInquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
class EnterpriseInquiryController extends Controller
{
    //
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

        // 2. Store the inquiry
        EnterpriseInquiry::create($validated);

        // 3. Redirect back with success message (Inertia handles this flash)
        return Redirect::back()->with('success', 'Inquiry submitted successfully! We will reach out soon.');
    }
}
