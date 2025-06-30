<?php

namespace App\Http\Repositories\Operation;

use App\Models\Operation;
use Illuminate\Database\Eloquent\Collection;

interface OperationRepositoryInterface
{
    public function getAll(int $itemId): Collection;
    public function getById(int $itemId, int $operationId): ?Operation;
    public function store(array $data): Operation;
    public function update(int $itemId, int $operationId, array $data): bool;
    public function destroy(int $itemId, int $operationId): bool;
}