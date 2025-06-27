<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Operation extends Model
{
    protected $fillable = [
        'name',
        'code',
        'item_id'
    ];

    protected $hidden = [
        'updated_at'
    ];

    protected $casts = [
        'name' => 'string',
        'code' => 'string',
        'item_id' => 'integer',
    ];

    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }

    public function metrologyCalls(): HasMany
    {
        return $this->hasMany(MetrologyCall::class);
    }

    public function machines(): HasMany
    {
        return $this->hasMany(Machine::class, 'operation_id', 'id');
    }
}
