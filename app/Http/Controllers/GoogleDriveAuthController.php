<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use App\Services\SheetCopyService;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use App\Jobs\ProvisionUserDrive; // Import the Job

class GoogleDriveAuthController extends Controller
{
    public function redirect()
    {
//        return Socialite::driver('google')
//            ->redirectUrl(config('services.google.drive_redirect'))
//            ->scopes(['email', 'profile'])
//            ->redirect();
        return Socialite::driver('google')
            ->redirectUrl(config('services.google.drive_redirect'))
            // ADDED: Drive scope needed to create files
            ->scopes(['email', 'profile', 'https://www.googleapis.com/auth/drive.file'])
            // ADDED: Necessary to get the 'refresh_token' for background jobs
            ->with(['access_type' => 'offline', 'prompt' => 'consent'])
            ->redirect();
    }

    public function callback()
    {
        $user = Auth::user();

        // 1. Handle Socialite
        $googleUser = Socialite::driver('google')
            ->redirectUrl(config('services.google.drive_redirect'))
            ->stateless()
            ->user();

        // 2. Update Token
        $user->googleAccount()->updateOrCreate(
            ['google_id' => $googleUser->id],
            [
                'email' => $googleUser->email,
                'access_token' => $googleUser->token,
                'refresh_token' => $googleUser->refreshToken,
                'token_expires_at' => now()->addSeconds($googleUser->expiresIn),
            ]
        );

        // 3. Activate Plan
        $proPlan = Plan::where('type', 'pro')->firstOrFail();

        // Sync without detaching ensures we don't overwrite existing active plans if logic changes
        $user->plans()->syncWithoutDetaching([
            $proPlan->id => [
                'status' => 'active',
                'starts_at' => now(),
            ],
        ]);

        // 4. Dispatch the Background Job (Fixes Timeout)
        // This runs the heavy Google API logic in the background
        ProvisionUserDrive::dispatch($user, $proPlan);

        return redirect('/dashboard')->with(
            'success',
            'Pro activated! We are setting up your Google Drive folder in the background. It will appear in a few minutes.'
        );
    }

}
