<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Log extends Model
{
    protected $fillable = [
        'user_id',
        'action_id',
        'description',
        'table_id',
        'details'
    ];

    protected $hidden = [
        'updated_at',
    ];

    protected $casts = [
        'user_id' => 'integer',
        'action_id' => 'integer',
        'description' => 'string',
        'table_id' => 'integer',
        'details' => 'json',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function action(): BelongsTo
    {
        return $this->belongsTo(Action::class);
    }

    public function table(): BelongsTo
    {
        return $this->belongsTo(Table::class);
    }
}
