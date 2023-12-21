<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NowDivisionAndRating extends Model
{
    use HasFactory;

    protected $fillable = [
        'diagnosis_history_id',
        'user_id',
        'mst_housework_id',
        'mst_housework_category_id',
        'users_times',
        'users_rate',
        'users_minutes',
        'partners_times',
        'partners_rate',
        'partners_minutes',
    ];
}
