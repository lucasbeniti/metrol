<?php

namespace App\Http\Repositories\Operation;

use App\Models\Operation;
use Illuminate\Database\Eloquent\Collection;

class OperationRepository implements OperationRepositoryInterface
{
    protected Operation $model;

    public function __construct(Operation $operation)
    {
        $this->model = $operation;
    }

    public function getAll(int $itemId): Collection
    {
        return $this->model->with('item')->where('item_id', $itemId)->get();
    }

    public function getById(int $itemId, int $operationId): ?Operation
    {
        return $this->model->where('item_id', $itemId)->find($operationId);
    }

    public function store(array $data): Operation
    {
        return $this->model->create($data);
    }

    public function update(int $itemId, int $operationId, array $data): bool
    {
        $operation = $this->getById($itemId, $operationId);

        if (!$operation) {
            return false;
        }

        return $operation->update($data);
    }

    public function destroy(int $itemId, int $operationId): bool
    {
        $operation = $this->getById($itemId, $operationId);

        if (!$operation) {
            return false;
        }

        return $operation->delete();
    }
}