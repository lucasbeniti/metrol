<?php

namespace App\Http\Services\Operation;

use App\Enums\LogActionsEnum;
use App\Enums\LogEntitiesEnum;
use App\Enums\LogTablesEnum;
use App\Http\Repositories\Operation\OperationRepositoryInterface;
use App\Models\Operation;
use App\Traits\LogsTrait;
use Exception;
use Illuminate\Database\Eloquent\Collection;

class OperationService implements OperationServiceInterface
{
    use LogsTrait;

    public function __construct(
        private OperationRepositoryInterface $operationRepository
    ) {
        $this->initializeLogsTrait();
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

        $operation = $this->operationRepository->store($data);

        $this->storeLog(
            LogActionsEnum::CREATE,
            LogEntitiesEnum::OPERATIONS,
            $operation->name,
            LogTablesEnum::OPERATIONS,
            $this->getOperationLogDetails($operation)
        );

        return $operation;
    }

    public function update(int $itemId, int $operationId, array $data): bool
    {
        $operationWithCodeAlreadyExists = $this->operationRepository->getByCode($data['item_id'], $data['code']);

        if ($operationWithCodeAlreadyExists && $operationWithCodeAlreadyExists->id !== $operationId) {
            throw new Exception('Já existe uma operação com esse código.');
        }

        $success = $this->operationRepository->update($itemId, $operationId, $data);

        $operation = $this->getById($itemId, $operationId);

        if ($success) {
            $this->storeLog(
                LogActionsEnum::UPDATE,
                LogEntitiesEnum::OPERATIONS,
                $data['name'],
                LogTablesEnum::OPERATIONS,
                $this->getOperationLogDetails($operation)
            );
        }

        return $success;
    }

    public function destroy(int $itemId, int $operationId): bool
    {
        $operation = $this->getById($itemId, $operationId);

        $operationName = $operation->name;

        if ($operation->metrologyCalls()->count() > 0 || $operation->machines()->count() > 0) {
            throw new Exception('Não é possível excluir uma operação que possui chamados de metrologia ou máquinas associadas.');
        }

        $success = $this->operationRepository->destroy($itemId, $operationId);
        
        if ($success) {
            $this->storeLog(
                LogActionsEnum::DELETE,
                LogEntitiesEnum::OPERATIONS,
                $operationName,
                LogTablesEnum::OPERATIONS
            );
        }

        return $success;
    }

    private function getOperationLogDetails(Operation $operation): array
    {
        return [
            'name' => $operation->name,
            'code' => $operation->code,
            'item' => $operation->item->name
        ];
    }
}