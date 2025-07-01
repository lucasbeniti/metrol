<?php

namespace App\Http\Repositories\Log;

use App\Models\Log;
use Illuminate\Database\Eloquent\Collection;

class LogRepository implements LogRepositoryInterface 
{
    protected Log $model;

    public function __construct(Log $log)
    {
        $this->model = $log;
    }

    public function getAll(): Collection
    {
        return $this->model->with(['user', 'action', 'table'])->get();
    }
}