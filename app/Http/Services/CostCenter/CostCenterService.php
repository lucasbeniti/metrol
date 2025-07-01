<?php

namespace App\Http\Services\CostCenter;

use App\Enums\LogActionsEnum;
use App\Enums\LogTablesEnum;
use App\Http\Repositories\CostCenter\CostCenterRepositoryInterface;
use App\Http\Services\Log\LogServiceInterface;
use App\Models\CostCenter;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class CostCenterService implements CostCenterServiceInterface
{
    protected CostCenterRepositoryInterface $costCenterRepository;
    protected LogServiceInterface $logService;

    public function __construct(CostCenterRepositoryInterface $costCenterRepository, LogServiceInterface $logService)
    {
        $this->costCenterRepository = $costCenterRepository;
        $this->logService = $logService;
    }

    public function getAll(): Collection
    {
        return $this->costCenterRepository->getAll();
    }

    public function getById(int $id): ?CostCenter
    {
        return $this->costCenterRepository->getById($id);
    }

    public function store(array $data): CostCenter
    {
        $costCenterWithCodeAlreadyExists = $this->costCenterRepository->getByCode($data['code']);

        if ($costCenterWithCodeAlreadyExists) {
            throw new Exception('Já existe um centro de custo com esse código.');
        }

        $costCenter = $this->costCenterRepository->store($data);

        $authenticatedUser = Auth::user();

        $this->logService->store([
            'user_id' => $authenticatedUser->id,
            'action_id' => LogActionsEnum::CREATE,
            'description' => 'O usuário ' . $authenticatedUser->name . ' criou o centro de custo: ' . $costCenter->name,
            'table_id' => LogTablesEnum::COST_CENTERS,
        ]);

        return $costCenter;
    }

    public function update(int $id, array $data): bool
    {
        $costCenterWithCodeAlreadyExists = $this->costCenterRepository->getByCode($data['code']);

        if ($costCenterWithCodeAlreadyExists && $costCenterWithCodeAlreadyExists->id !== $id) {
            throw new Exception('Já existe um centro de custo com esse código.');
        }

        $success = $this->costCenterRepository->update($id, $data);

        if ($success) {
            $authenticatedUser = Auth::user();

            $this->logService->store([
                'user_id' => $authenticatedUser->id,
                'action_id' => LogActionsEnum::UPDATE,
                'description' => 'O usuário ' . $authenticatedUser->name . ' atualizou o centro de custo: ' . $data['name'],
                'table_id' => LogTablesEnum::COST_CENTERS,
            ]);
        }
        
        return $success;
    }

    public function destroy(int $id): bool
    {
        $costCenter = $this->costCenterRepository->getById($id);

        if ($costCenter->items()->count() > 0) {
            throw new Exception('Não é possível excluir um centro de custo que possui peças associadas.');
        }

        $success = $this->costCenterRepository->destroy($id);

        if ($success) {
            $authenticatedUser = Auth::user();

            $this->logService->store([
                'user_id' => $authenticatedUser->id,
                'action_id' => LogActionsEnum::DELETE,
                'description' => 'O usuário ' . $authenticatedUser->name . ' deletou o centro de custo: ' . $costCenter->name,
                'table_id' => LogTablesEnum::COST_CENTERS,
            ]);
        }

        return $success;
    }
}