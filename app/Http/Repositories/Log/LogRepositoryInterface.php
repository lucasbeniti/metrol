<?php

namespace App\Http\Repositories\Log;

use Illuminate\Database\Eloquent\Collection;

interface LogRepositoryInterface
{
    public function getAll(): Collection;
    public function store(array $data): void;
}