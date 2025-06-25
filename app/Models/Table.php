<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    protected $fillable = [
        'name'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'name' => 'string'
    ];

    public function logs()
    {
        return $this->hasMany(Log::class, 'table_id', 'id');
    }
}
