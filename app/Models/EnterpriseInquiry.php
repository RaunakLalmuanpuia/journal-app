<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EnterpriseInquiry extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'user_id',
        'company',
        'contact_name',
        'email',
        'team_size',
        'requirements',
        'budget',
    ];

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
