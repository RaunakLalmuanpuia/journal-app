<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use App\Services\SheetCopyService;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleDriveAuthController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')
            ->redirectUrl(config('services.google.drive_redirect'))
            ->scopes(['email', 'profile'])
            ->redirect();
    }

    public function callback()
    {
        $user = Auth::user();

        // Get the token from Socialite callback
        $googleUser = Socialite::driver('google')
            ->redirectUrl(config('services.google.drive_redirect'))
            ->stateless()->user();
        $accessToken = $googleUser->token; // <-- This is the token we pass to SheetCopyService

        // Save Google account info (optional)
        $user->googleAccount()->updateOrCreate(
            ['google_id' => $googleUser->id],
            [
                'email' => $googleUser->email,
                'access_token' => $accessToken,
                'refresh_token' => $googleUser->refreshToken,
                'token_expires_at' => now()->addSeconds($googleUser->expiresIn),
            ]
        );

        // Activate Pro plan
        $proPlan = Plan::where('type', 'pro')->firstOrFail();

        $user->plans()->syncWithoutDetaching([
            $proPlan->id => [
                'status' => 'active',
                'starts_at' => now(),
            ],
        ]);

        // CHANGE THIS LINE: Call the folder provisioner
        SheetCopyService::provisionFolderForUser($user, $proPlan);

        return redirect('/dashboard')->with(
            'success',
            'Pro activated and Google Sheet copied to your Drive 🎉'
        );

    }

}
