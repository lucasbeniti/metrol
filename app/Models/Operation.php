<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Operation extends Model
{
    protected $fillable = [
        'name',
        'code',
        'item_id',
        'cost_center_id',
        'created_at',
    ];

    protected $hidden = [
        'updated_at'
    ];

    public function costCenter() {
        return $this->belongsTo(CostCenter::class);
    }

    public function item() {
        return $this->belongsTo(Item::class);
    }
}
