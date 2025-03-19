<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CostCenter extends Model
{
    protected $fillable = [
        'name',
        'code',
        'client_id',
        'created_at',
    ];

    protected $hidden = [
        'updated_at'
    ];

    public function client() {
        return $this->belongsTo(Client::class);
    }
}
