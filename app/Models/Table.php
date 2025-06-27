<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    public function logs(): HasMany
    {
        return $this->hasMany(Log::class, 'table_id', 'id');
    }
}
