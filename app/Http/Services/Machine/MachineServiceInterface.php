<?php

namespace App\Http\Services\Machine;

use App\Models\Machine;
use Illuminate\Database\Eloquent\Collection;

interface MachineServiceInterface
{
    public function getAll(): Collection;
    public function getById(int $id): ?Machine;
    public function store(array $data): Machine;
    public function update(int $id, array $data): bool;
    public function destroy(int $id): bool;
}