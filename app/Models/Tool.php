<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tool extends Model
{
    protected $fillable = [
        'name',
        'code',
        'created_at'
    ];

    protected $hidden = [
        'updated_at'
    ];

}
