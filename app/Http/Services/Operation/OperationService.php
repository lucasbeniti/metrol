<?php

namespace App\Http\Services\Operation;

use App\Http\Repositories\Operation\OperationRepositoryInterface;
use App\Models\Operation;
use Illuminate\Database\Eloquent\Collection;

class OperationService implements OperationServiceInterface
{
    protected OperationRepositoryInterface $operationRepository;

    public function __construct(OperationRepositoryInterface $operationRepository)
    {
        $this->operationRepository = $operationRepository;
    }

    public function getAll(int $itemId): Collection
    {
        return $this->operationRepository->getAll($itemId);
    }

    public function getById(int $itemId, int $operationId): ?Operation
    {
        return $this->operationRepository->getById($itemId, $operationId);
    }

    public function store(array $data): Operation
    {
        return $this->operationRepository->store($data);
    }

    public function update(int $itemId, int $operationId, array $data): bool
    {
        return $this->operationRepository->update($itemId, $operationId, $data);
    }

    public function destroy(int $itemId, int $operationId): bool
    {
        return $this->operationRepository->destroy($itemId, $operationId);
    }
}