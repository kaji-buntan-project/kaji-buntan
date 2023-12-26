<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IdealDivision extends Model
{
    use HasFactory;

    protected $fillable = [
        'now_division_and_rating_id',
        'users_times',
        'partners_times',
    ];
}
