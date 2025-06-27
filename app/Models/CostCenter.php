<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CostCenter extends Model
{
    protected $fillable = [
        'name',
        'code',
        'client_id'
    ];

    protected $hidden = [
        'updated_at'
    ];

    protected $casts = [
        'name' => 'string',
        'code' => 'string',
        'client_id' => 'integer'
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(Item::class);
    }
}
