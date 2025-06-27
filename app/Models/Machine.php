<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
        'code' => 'string',
        'operation_id' => 'integer',
    ];

    public function operation(): BelongsTo
    {
        return $this->belongsTo(Operation::class);
    }

    public function metrologyCalls(): HasMany
    {
        return $this->hasMany(MetrologyCall::class);
    }
}
