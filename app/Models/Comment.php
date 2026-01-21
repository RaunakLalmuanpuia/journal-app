<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Comment extends Model
{
    // Add user_id to fillable
    protected $fillable = ['user_id', 'comment', 'post_id', 'is_approved','parent_id'];

    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }

    // New Relationship
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Replies (Children)
    public function replies(): HasMany
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }

    // Likes
    public function likes(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'comment_likes');
    }
}
