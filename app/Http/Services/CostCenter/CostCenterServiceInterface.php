<?php

namespace App\Http\Services\CostCenter;

use App\Models\CostCenter;
use Illuminate\Database\Eloquent\Collection;

interface CostCenterServiceInterface
{
    public function getAll(): Collection;
    public function getById(int $id): ?CostCenter;
    public function store(array $data): CostCenter;
    public function update(int $id, array $data): bool;
    public function destroy(int $id): bool;
}