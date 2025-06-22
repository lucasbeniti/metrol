<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MetrologyCallStatus extends Model
{
    protected $table = 'metrology_call_statuses';

    protected $fillable = [
        'name'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function metrologyCalls()
    {
        return $this->hasMany(MetrologyCall::class, 'metrology_call_status_id');
    }
}
