<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DriveFile extends Model
{
    protected $fillable = [
        'drive_resource_id',
        'google_file_id',
        'name',
        'type',
        'link',
    ];

    public function resource(): BelongsTo
    {
        return $this->belongsTo(DriveResource::class, 'drive_resource_id');
    }
}
