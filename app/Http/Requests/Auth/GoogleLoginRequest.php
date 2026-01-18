<?php

namespace App\Http\Requests\Auth;

use App\Models\GoogleAccount;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Laravel\Socialite\Facades\Socialite;

class GoogleLoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            // No validation rules needed as we trust Google's response
        ];
    }

    /**
     * core authentication logic
     */
    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        try {
            // 1. Fetch User from Google
            // stateless() is often used to avoid state mismatch errors in some setups
            $googleUser = Socialite::driver('google')->stateless()->user();


//            dd($googleUser);
            // 2. Find or Create User
            // We verify by email first to merge accounts if they used normal registration before
            $user = User::updateOrCreate([
                'email' => $googleUser->email,
            ], [
                'name' => $googleUser->name,
                'google_id' => $googleUser->id,
                'avatar' => $googleUser->avatar, // Optional: if you have this column
                'password' => Hash::make(Str::random(32)), // Secure random password
                'status' => 'Active',
                'email_verified_at' => now(),
            ]);

            /**
             * Store Google OAuth Tokens
             */
//            GoogleAccount::updateOrCreate(
//                ['user_id' => $user->id],
//                [
//                    'google_id'        => $googleUser->id,
//                    'email'            => $googleUser->email,
//                    'access_token'     => $googleUser->token,
//                    'refresh_token'    => $googleUser->refreshToken,
//                    'token_expires_at' => now()->addSeconds($googleUser->expiresIn),
//                ]
//            );


            // 4. Assign User Role
            if ($user->wasRecentlyCreated) {
                $user->assignRole('User'); // make sure role exists
            }
            // 4. Log the user in
            Auth::login($user, $remember = true);

            $freePlan = Plan::where('type', 'free')->first();
            $user->plans()->syncWithoutDetaching([
                $freePlan->id => [
                    'status' => 'active',
                    'starts_at' => now(),
                ],
            ]);

        } catch (\Exception $e) {
            // Hit the rate limiter if authentication fails
            RateLimiter::hit($this->throttleKey());

            // Useful for debugging: Log::error($e->getMessage());

            throw ValidationException::withMessages([
                'email' => 'Google authentication failed. Please try again.',
            ]);
        }

        RateLimiter::clear($this->throttleKey());
    }

    /**
     * Ensure the login request is not rate limited.
     */
    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        // Use IP address for rate limiting
        return Str::transliterate('google-login|'.$this->ip());
    }
}
