<?php

namespace App\Http\Repositories\Log;

use App\Models\Log;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class LogRepository implements LogRepositoryInterface 
{
    protected Log $model;

    public function __construct(Log $log)
    {
        $this->model = $log;
    }

    public function getAll(Request $request): Collection
    {
        $query = $this->model->newQuery();

        if ($request->filled('user_id') && $request->input('user_id') !== 'all') {
            $query->where('user_id', $request->input('user_id'));
        }

        if ($request->filled('action_id') && $request->input('action_id') !== 'all') {
            $query->where('action_id', $request->input('action_id'));
        }

        if ($request->filled('table_id') && $request->input('table_id') !== 'all') {
            $query->where('table_id', $request->input('table_id'));
        }

        return $query->with(['user', 'action', 'table'])->get();
    }

    public function store(array $data): void
    {
        $this->model->create($data);
    }
}