<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = [
        'name',
        'code',
        'cost_center_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function costCenter() 
    {
        return $this->belongsTo(CostCenter::class);
    }

    public function operations()
    {
        return $this->hasMany(Operation::class);
    }
}
