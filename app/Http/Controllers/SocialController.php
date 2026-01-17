<?php

namespace App\Http\Controllers;
use App\Http\Requests\Auth\GoogleLoginRequest; // Import the new Request
use Illuminate\Http\RedirectResponse;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;

class SocialController extends Controller
{
    //
    /**
     * Redirect to Google
     */
    public function redirectToGoogle()
    {
        return Socialite::driver('google')
            ->scopes(['openid', 'profile'])
//            ->with(['access_type' => 'offline', 'prompt' => 'consent'])
            ->redirect();
    }

    /**
     * Handle Google Callback using the Custom Request
     */
    public function handleGoogleCallback(GoogleLoginRequest $request): RedirectResponse
    {
        // The logic is now encapsulated inside the request class
        $request->authenticate();

        // Regenerate session for security
        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));
    }
}
