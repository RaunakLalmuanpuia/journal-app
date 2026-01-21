<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EnterpriseInquiry extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'company',
        'contact_name',
        'email',
        'team_size',
        'requirements',
        'budget',
    ];
}
