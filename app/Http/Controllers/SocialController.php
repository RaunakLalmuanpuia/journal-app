<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\GoogleLoginRequest;
use Illuminate\Http\RedirectResponse;
use Laravel\Socialite\Facades\Socialite;

class SocialController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')
            ->scopes([
                'openid',
                'profile',
                'email',
                // ✅ Request Drive scope at login — no second OAuth needed later
                'https://www.googleapis.com/auth/drive.file',
            ])
            ->with([
                'access_type' => 'offline',  // get refresh_token
                'prompt'      => 'consent',  // force consent so refresh_token is always returned
            ])
            ->redirect();
    }

    public function handleGoogleCallback(GoogleLoginRequest $request): RedirectResponse
    {
        $request->authenticate();
        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));
    }
}
