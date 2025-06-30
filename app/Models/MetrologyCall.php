<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MetrologyCall extends Model
{
    protected $fillable = [
        'machine_id',
        'operation_id',
        'opened_by_user_id',
        'metrology_call_type_id',
        'closed_by_user_id',
        'metrology_call_status_id',
        'closed_at',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'machine_id' => 'integer',
        'operation_id' => 'integer',
        'opened_by_user_id' => 'integer',
        'metrology_call_type_id' => 'integer',
        'closed_by_user_id' => 'integer',
        'metrology_call_status_id' => 'integer',
        'closed_at' => 'datetime',
    ];

    public function operation(): BelongsTo
    {
        return $this->belongsTo(Operation::class);
    }

    public function machine(): BelongsTo
    {
        return $this->belongsTo(Machine::class);
    }

    public function openedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'opened_by_user_id');
    }

    public function closedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'closed_by_user_id');
    }

    public function metrologyCallType(): BelongsTo
    {
        return $this->belongsTo(MetrologyCallType::class);
    }

    public function metrologyCallStatus(): BelongsTo
    {
        return $this->belongsTo(MetrologyCallStatus::class);
    }
}
