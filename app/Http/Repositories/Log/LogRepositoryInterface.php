<?php

namespace App\Http\Repositories\Log;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

interface LogRepositoryInterface
{
    public function getAll(Request $request): Collection;
    public function store(array $data): void;
}