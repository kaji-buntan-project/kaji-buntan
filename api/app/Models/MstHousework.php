<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MstHousework extends Model
{
    use HasFactory;

    protected $fillable = ['mst_housework_category_id', 'name'];
}
