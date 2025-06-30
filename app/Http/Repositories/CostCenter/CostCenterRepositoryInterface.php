<?php

namespace App\Http\Repositories\CostCenter;

use App\Models\CostCenter;
use Illuminate\Database\Eloquent\Collection;

interface CostCenterRepositoryInterface
{
    public function getAll(): Collection;
    public function getById(int $id): ?CostCenter;
    public function store(array $data): CostCenter;
    public function update(int $id, array $data): bool;
    public function destroy(int $id): bool;
}