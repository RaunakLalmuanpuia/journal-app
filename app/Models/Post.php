<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'title', 'subtitle', 'description', 'content', 'featured_image',
        'status', 'is_featured', 'category', 'tags', 'slug',
        'seo_title', 'seo_description', 'seo_keywords', 'published_at'
    ];

    protected $casts = [
        'tags' => 'array',
        'seo_keywords' => 'array',
        'is_featured' => 'boolean',
        'published_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();
        // Automatically create a slug when creating a post
        static::creating(function ($post) {
            if (empty($post->slug)) {
                $post->slug = Str::slug($post->title);
            }
        });
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class)->where('is_approved', true);
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function likedBy(): BelongsToMany
    {
        // This allows us to see all users who liked this post
        return $this->belongsToMany(User::class, 'post_user')->withTimestamps();
    }
}
