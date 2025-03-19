<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
        'name',
        'created_at'
    ];

    protected $hidden = [
        'updated_at'
    ];

    public function costCenters() {
        return $this->hasMany(CostCenter::class);
    }
}
