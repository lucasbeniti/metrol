<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MetrologyCallType extends Model
{
    protected $fillable = [
        'name'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'name' => 'string',
    ];

    public function metrologyCalls(): HasMany
    {
        return $this->hasMany(MetrologyCall::class, 'metrology_call_type_id');
    }
}
