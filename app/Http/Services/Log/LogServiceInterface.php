<?php

namespace App\Http\Services\Log;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

interface LogServiceInterface
{
    public function getAll(Request $request): Collection;
    public function store(array $data): void;
}