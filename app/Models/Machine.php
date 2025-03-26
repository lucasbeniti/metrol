<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Machine extends Model
{
    protected $fillable = [
        'name',
        'code',
        'operation_id',
        'tool_id',
        'created_at'
    ];

    protected $hidden = [
        'updated_at'
    ];

    public function operation() {
        return $this->belongsTo(Operation::class);
    }

    public function tool() {
        return $this->belongsTo(Tool::class);
    }
}
