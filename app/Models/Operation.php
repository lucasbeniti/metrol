<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Operation extends Model
{
    protected $fillable = [
        'name',
        'code',
        'item_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function item() 
    {
        return $this->belongsTo(Item::class);
    }

    public function metrologyCalls()
    {
        return $this->hasMany(MetrologyCall::class);
    }

    public function machines()
    {
        return $this->hasMany(Machine::class, 'operation_id', 'id');
    }
}
