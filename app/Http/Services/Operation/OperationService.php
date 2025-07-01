<?php

namespace App\Http\Services\Operation;

use App\Http\Repositories\Operation\OperationRepositoryInterface;
use App\Models\Operation;
use Exception;
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
        $operationWithCodeAlreadyExists = $this->operationRepository->getByCode($data['item_id'], $data['code']);

        if ($operationWithCodeAlreadyExists) {
            throw new Exception('Já existe uma operação com esse código.');
        }

        return $this->operationRepository->store($data);
    }

    public function update(int $itemId, int $operationId, array $data): bool
    {
        $operationWithCodeAlreadyExists = $this->operationRepository->getByCode($data['item_id'], $data['code']);

        if ($operationWithCodeAlreadyExists) {
            throw new Exception('Já existe uma operação com esse código.');
        }

        return $this->operationRepository->update($itemId, $operationId, $data);
    }

    public function destroy(int $itemId, int $operationId): bool
    {
        $operation = $this->getById($itemId, $operationId);

        if ($operation->metrologyCalls()->count() > 0 || $operation->machines()->count() > 0) {
            throw new Exception('Não é possível excluir uma operação que possui chamados de metrologia ou máquinas associadas.');
        }

        return $this->operationRepository->destroy($itemId, $operationId);
    }
}