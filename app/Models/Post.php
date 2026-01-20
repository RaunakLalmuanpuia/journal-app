<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title','subtitle','description','content','featured_image',
        'status','is_featured','category','tags',
        'seo_title','seo_description','seo_keywords','published_at'
    ];

    protected $casts = [
        'tags' => 'array',
        'seo_keywords' => 'array',
        'is_featured' => 'boolean',
        'published_at' => 'datetime',
    ];

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class)->where('is_approved', true);
    }
}
