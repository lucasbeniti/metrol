<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MetrologyCallStatus extends Model
{
    protected $table = 'metrology_call_statuses';

    protected $fillable = [
        'name'
    ];

    protected $hidden = [
        'updated_at',
    ];

    protected $casts = [
        'name' => 'string',
    ];

    public function metrologyCalls(): HasMany
    {
        return $this->hasMany(MetrologyCall::class, 'metrology_call_status_id');
    }
}
