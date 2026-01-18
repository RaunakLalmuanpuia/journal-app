<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DriveResource extends Model
{
    //
    protected $fillable = [
        'user_id',
        'plan_id',
        'type',
        'google_file_id',
        'name',
        'status',
        'link'
    ];

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function plan() : BelongsTo
    {
        return $this->belongsTo(Plan::class);
    }
    public function files(): HasMany
    {
        return $this->hasMany(DriveFile::class);
    }
}
