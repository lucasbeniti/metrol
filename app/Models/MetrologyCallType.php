<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MetrologyCallType extends Model
{
    protected $fillable = [
        'name'
    ];

    protected $hidden = [
        'updated_at',
    ];

    protected $casts = [
        'name' => 'string',
    ];

    public function metrologyCalls()
    {
        return $this->hasMany(MetrologyCall::class, 'metrology_call_type_id');
    }
}
