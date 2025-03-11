<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MetrologyCall extends Model
{
    protected $fillable = [
        'item_name',
        'machine_id',
        'operation_id',
        'type',
        'user_id',
        'status',
        'closed_at',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function machine() {
        return $this->belongsTo(Machine::class);
    }

    public function operation( ) {
        return $this->belongsTo(Operation::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
