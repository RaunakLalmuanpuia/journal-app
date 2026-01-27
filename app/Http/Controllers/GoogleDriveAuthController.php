<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use App\Services\SheetCopyService;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use App\Jobs\ProvisionUserDrive; // Import the Job
use Illuminate\Http\Request;

class GoogleDriveAuthController extends Controller
{
    public function redirect(Request $request)
    {
//        return Socialite::driver('google')
//            ->redirectUrl(config('services.google.drive_redirect'))
//            ->scopes(['email', 'profile'])
//            ->redirect();
        $user = Auth::user();
        $proPlan = Plan::where('type', 'pro')->firstOrFail();

        // Convert string "Jan,Feb" to array
        $months = $request->query('months')
            ? explode(',', $request->query('months'))
            : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // Save the selection to the DB immediately
        $user->plans()->syncWithoutDetaching([
            $proPlan->id => [
                'selected_months' => json_encode($months),
                'starts_at' => now(),
            ],
        ]);

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

        // 2. Find the pending plan record
        $proPlan = Plan::where('type', 'pro')->firstOrFail();
        $pivotData = $user->plans()->where('plan_id', $proPlan->id)->first()->pivot;

        // Parse the months we saved earlier
        $selectedMonths = json_decode($pivotData->selected_months, true) ?: [];

        // 3. Update status to active
        $user->plans()->updateExistingPivot($proPlan->id, [
            'status' => 'active'
        ]);

        // 4. Dispatch the Job with the months from the DB
        ProvisionUserDrive::dispatch($user, $proPlan, $selectedMonths);

        return redirect('/dashboard')->with(
            'success',
            'Pro activated! We are setting up your Google Drive folder in the background. It will appear in a few minutes.'
        );
    }

}
