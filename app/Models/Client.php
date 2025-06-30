<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model
{
    protected $fillable = [
        'name',
        'code'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'name' => 'string',
        'code' => 'string'
    ];

    public function costCenters(): HasMany
    {
        return $this->hasMany(CostCenter::class);
    }
}
