<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar',
        'mobile',
        'status',
        'google_id',
        'email_verified_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */

    protected $appends = ['last_active_at'];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getLastActiveAtAttribute(): ?Carbon
    {
        $timestamp = DB::table('sessions')
            ->where('user_id', $this->id)
            ->max('last_activity');

        return $timestamp
            ? Carbon::createFromTimestamp($timestamp)
            : null;
    }
    public function plans(): BelongsToMany
    {
        return $this->belongsToMany(Plan::class, 'user_plans')
            ->withPivot(['starts_at', 'ends_at', 'status'])
            ->withTimestamps();
    }
    public function googleAccount() :HasOne
    {
        return $this->hasOne(GoogleAccount::class);
    }

    public function driveResources() : HasMany
    {
        return $this->hasMany(DriveResource::class);
    }

    public function payments() : HasMany
    {
        return $this->hasMany(Payment::class);
    }

    //$hasActiveFree = $user->activeFreePlan()->exists();
    public function activeFreePlan()
    {
        return $this->plans()
            ->where('plans.type', 'free')
            ->wherePivot('status', 'active')
            ->where(function ($q) {
                $q->whereNull('user_plans.ends_at')
                    ->orWhere('user_plans.ends_at', '>', now());
            });
    }

    public function supportTickets(): HasMany
    {
        return $this->hasMany(SupportTicket::class);
    }

}
