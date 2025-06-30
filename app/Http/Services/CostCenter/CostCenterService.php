<?php

namespace App\Http\Services\CostCenter;

use App\Http\Repositories\CostCenter\CostCenterRepositoryInterface;
use App\Models\CostCenter;
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
        return $this->costCenterRepository->store($data);
    }

    public function update(int $id, array $data): bool
    {
        return $this->costCenterRepository->update($id, $data);
    }

    public function destroy(int $id): bool
    {
        return $this->costCenterRepository->destroy($id);
    }
}