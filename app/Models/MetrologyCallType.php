<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MetrologyCallType extends Model
{
    protected $fillable = [
        'name'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function metrologyCalls()
    {
        return $this->hasMany(MetrologyCall::class, 'metrology_call_type_id');
    }
}
