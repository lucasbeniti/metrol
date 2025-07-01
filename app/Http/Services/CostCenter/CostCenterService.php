<?php

namespace App\Http\Services\CostCenter;

use App\Http\Repositories\CostCenter\CostCenterRepositoryInterface;
use App\Models\CostCenter;
use Exception;
use Illuminate\Database\Eloquent\Collection;

class CostCenterService implements CostCenterServiceInterface
{
    protected CostCenterRepositoryInterface $costCenterRepository;

    public function __construct(CostCenterRepositoryInterface $costCenterRepository)
    {
        $this->costCenterRepository = $costCenterRepository;
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

        return $this->costCenterRepository->store($data);
    }

    public function update(int $id, array $data): bool
    {
        $costCenterWithCodeAlreadyExists = $this->costCenterRepository->getByCode($data['code']);

        if ($costCenterWithCodeAlreadyExists && $costCenterWithCodeAlreadyExists->id !== $id) {
            throw new Exception('Já existe um centro de custo com esse código.');
        }

        return $this->costCenterRepository->update($id, $data);
    }

    public function destroy(int $id): bool
    {
        $costCenter = $this->costCenterRepository->getById($id);

        if ($costCenter->items()->count() > 0) {
            throw new Exception('Não é possível excluir um centro de custo que possui peças associadas.');
        }

        return $this->costCenterRepository->destroy($id);
    }
}