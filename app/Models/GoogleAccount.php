<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Http;
class GoogleAccount extends Model
{
    //

    protected $fillable = [
        'user_id',
        'google_id',
        'email',
        'access_token',
        'refresh_token',
        'token_expires_at',
    ];

    protected $casts = [
        'token_expires_at' => 'datetime',
    ];

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function getValidAccessToken()
    {
        // 1. Check if the current token is expired (or expires in the next 60 seconds)
        if ($this->token_expires_at->isPast() || $this->token_expires_at->diffInSeconds(now()) < 60) {
            $this->refreshAccessToken();
        }

        return $this->access_token;
    }

    /**
     * Internal method to hit Google servers and get a new token.
     */
    protected function refreshAccessToken()
    {
        // 2. Make the request to Google
        $response = Http::post('https://oauth2.googleapis.com/token', [
            'grant_type'    => 'refresh_token',
            'refresh_token' => $this->refresh_token,
            'client_id'     => config('services.google.client_id'),
            'client_secret' => config('services.google.client_secret'),
        ]);

        if ($response->successful()) {
            $data = $response->json();

            // 3. Update the database with the new token
            $this->update([
                'access_token' => $data['access_token'],
                // Google returns 'expires_in' in seconds (usually 3599)
                'token_expires_at' => now()->addSeconds($data['expires_in']),
            ]);
        } else {
            // Handle error (e.g., user revoked access)
            // You might want to log this or throw an exception
            logger()->error('Failed to refresh Google Token: ' . $response->body());
        }
    }

//    public function listDriveFiles()
//    {
//        $googleAccount = auth()->user()->googleAccount;
//
//        // AUTOMAGIC: This line checks expiry and refreshes the token if needed
//        $token = $googleAccount->getValidAccessToken();
//
//        // Now use the valid token to call the Drive API
//        $response = Http::withToken($token)
//            ->get('https://www.googleapis.com/drive/v3/files');
//
//        return $response->json();
//    }
}
