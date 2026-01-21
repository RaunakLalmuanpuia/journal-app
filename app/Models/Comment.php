<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    // Add user_id to fillable
    protected $fillable = ['user_id', 'comment', 'post_id', 'is_approved'];

    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }

    // New Relationship
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
