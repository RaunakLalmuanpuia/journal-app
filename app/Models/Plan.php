<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Plan extends Model
{
    //
    protected $fillable = [
        'name',
        'price',
        'type',
        'duration_days',
        'features',
        'is_custom',
    ];

    protected $casts = [
        'features' => 'array',
        'price' => 'decimal:2',
        'is_custom' => 'boolean',
    ];

    public function users() : BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_plans')
            ->withPivot(['starts_at', 'ends_at', 'status']);
    }

    public function driveResources() : HasMany
    {
        return $this->hasMany(DriveResource::class);
    }

    public function payments() : HasMany
    {
        return $this->hasMany(Payment::class);
    }

}
