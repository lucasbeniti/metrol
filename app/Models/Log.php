<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    protected $fillable = [
        'user_id',
        'action_id',
        'description',
        'table_id'
    ];

    protected $hidden = [
        'updated_at',
    ];

    protected $casts = [
        'user_id' => 'integer',
        'action_id' => 'integer',
        'description' => 'string',
        'table_id' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function action()
    {
        return $this->belongsTo(Action::class);
    }

    public function table()
    {
        return $this->belongsTo(Table::class);
    }
}
