<?php

namespace App\Http\Services\Operation;

use App\Enums\LogActionsEnum;
use App\Enums\LogTablesEnum;
use App\Http\Repositories\Operation\OperationRepositoryInterface;
use App\Http\Services\Log\LogServiceInterface;
use App\Models\Operation;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class OperationService implements OperationServiceInterface
{
    protected OperationRepositoryInterface $operationRepository;
    protected LogServiceInterface $logService;

    public function __construct(OperationRepositoryInterface $operationRepository, LogServiceInterface $logService)
    {
        $this->operationRepository = $operationRepository;
        $this->logService = $logService;
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

        $authenticatedUser = Auth::user();

        $this->logService->store([
            'user_id' => $authenticatedUser->id,
            'action_id' => LogActionsEnum::CREATE,
            'description' => 'O usuário ' . $authenticatedUser->name . ' criou a operação: ' . $operation->name,
            'table_id' => LogTablesEnum::OPERATIONS,
        ]);

        return $operation;
    }

    public function update(int $itemId, int $operationId, array $data): bool
    {
        $operationWithCodeAlreadyExists = $this->operationRepository->getByCode($data['item_id'], $data['code']);

        if ($operationWithCodeAlreadyExists) {
            throw new Exception('Já existe uma operação com esse código.');
        }

        $success = $this->operationRepository->update($itemId, $operationId, $data);

        if ($success) {
            $authenticatedUser = Auth::user();

            $this->logService->store([
                'user_id' => $authenticatedUser->id,
                'action_id' => LogActionsEnum::UPDATE,
                'description' => 'O usuário ' . $authenticatedUser->name . ' atualizou a operação: ' . $data['name'],
                'table_id' => LogTablesEnum::OPERATIONS,
            ]);
        }

        return $success;
    }

    public function destroy(int $itemId, int $operationId): bool
    {
        $operation = $this->getById($itemId, $operationId);

        if ($operation->metrologyCalls()->count() > 0 || $operation->machines()->count() > 0) {
            throw new Exception('Não é possível excluir uma operação que possui chamados de metrologia ou máquinas associadas.');
        }

        $success = $this->operationRepository->destroy($itemId, $operationId);
        
        if ($success) {
            $authenticatedUser = Auth::user();

            $this->logService->store([
                'user_id' => $authenticatedUser->id,
                'action_id' => LogActionsEnum::DELETE,
                'description' => 'O usuário ' . $authenticatedUser->name . ' deletou a operação: ' . $operation->name,
                'table_id' => LogTablesEnum::OPERATIONS,
            ]);
        }

        return $success;
    }
}