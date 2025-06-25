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
        'updated_at'
    ];

    protected $casts = [
        'name' => 'string',
        'code' => 'integer',
        'operation_id' => 'integer',
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
