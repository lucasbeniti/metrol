<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = [
        'name',
        'code',
        'created_at',
        'cost_center_id',
    ];

    protected $hidden = [
        'updated_at'
    ];

    public function costCenter() 
    {
        return $this->belongsTo(CostCenter::class);
    }
}
