<?php

namespace App\Http\Services\CostCenter;

use App\Enums\LogActionsEnum;
use App\Enums\LogEntitiesEnum;
use App\Enums\LogTablesEnum;
use App\Http\Repositories\CostCenter\CostCenterRepositoryInterface;
use App\Models\CostCenter;
use App\Traits\LogsTrait;
use Exception;
use Illuminate\Database\Eloquent\Collection;

class CostCenterService implements CostCenterServiceInterface
{
    use LogsTrait;

    protected CostCenterRepositoryInterface $costCenterRepository;  

    public function __construct(CostCenterRepositoryInterface $costCenterRepository)
    {
        $this->costCenterRepository = $costCenterRepository;
        $this->initializeLogsTrait();
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

        $this->storeLog(
            LogActionsEnum::CREATE,
            LogEntitiesEnum::COST_CENTERS,
            $costCenter->name,
            LogTablesEnum::COST_CENTERS,
            $this->getCostCenterLogDetails($costCenter)
        );

        return $costCenter;
    }

    public function update(int $id, array $data): bool
    {
        $costCenterWithCodeAlreadyExists = $this->costCenterRepository->getByCode($data['code']);

        if ($costCenterWithCodeAlreadyExists && $costCenterWithCodeAlreadyExists->id !== $id) {
            throw new Exception('Já existe um centro de custo com esse código.');
        }

        $success = $this->costCenterRepository->update($id, $data);

        $costCenter = $this->getById($id);

        if ($success) {
            $this->storeLog(
                LogActionsEnum::UPDATE,
                LogEntitiesEnum::COST_CENTERS,
                $data['name'],
                LogTablesEnum::COST_CENTERS,
                $this->getCostCenterLogDetails($costCenter)
            );
        }
        
        return $success;
    }

    public function destroy(int $id): bool
    {
        $costCenter = $this->costCenterRepository->getById($id);

        $costCenterName = $costCenter->name;

        if ($costCenter->items()->count() > 0) {
            throw new Exception('Não é possível excluir um centro de custo que possui items associadas.');
        }

        $success = $this->costCenterRepository->destroy($id);

        if ($success) {
            $this->storeLog(
                LogActionsEnum::DELETE,
                LogEntitiesEnum::COST_CENTERS,
                $costCenterName,
                LogTablesEnum::COST_CENTERS
            );
        }

        return $success;
    }

    private function getCostCenterLogDetails(CostCenter $costCenter): array
    {
        return [
            'name' => $costCenter->name,
            'code' => $costCenter->code,
            'client' => $costCenter->client->name
        ];
    }
}