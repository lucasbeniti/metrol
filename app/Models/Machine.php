<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Machine extends Model
{
    protected $fillable = [
        'name',
        'code',
        'operation_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function operation() 
    {
        return $this->belongsTo(Operation::class);
    }

    public function metrologyCalls()
    {
        return $this->hasMany(MetrologyCall::class);
    }
}
