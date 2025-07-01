<?php

namespace App\Http\Services\Log;

use Illuminate\Database\Eloquent\Collection;

interface LogServiceInterface
{
    public function getAll(): Collection;
    public function store(array $data): void;
}