<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
        'code' => 'integer',
        'client_id' => 'integer'
    ];

    public function client() 
    {
        return $this->belongsTo(Client::class);
    }

    public function items()
    {
        return $this->hasMany(Item::class);
    }
}
