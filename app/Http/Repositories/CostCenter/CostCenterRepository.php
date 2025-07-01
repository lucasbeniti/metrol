<?php

namespace App\Http\Repositories\CostCenter;

use App\Models\CostCenter;
use Illuminate\Database\Eloquent\Collection;

class CostCenterRepository implements CostCenterRepositoryInterface
{
    protected CostCenter $model;

    public function __construct(CostCenter $costCenter)
    {
        $this->model = $costCenter;
    }

    public function getAll(): Collection
    {
        return $this->model->with('client')->get();
    }

    public function getById(int $id): ?CostCenter
    {
        return $this->model->find($id);
    }

    public function store(array $data): CostCenter
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data): bool
    {
        $costCenter = $this->getById($id);

        if (!$costCenter) {
            return false;
        }

        return $costCenter->update($data);
    }

    public function destroy(int $id): bool
    {
        $costCenter = $this->getById($id);

        if (!$costCenter) {
            return false;
        }

        return $costCenter->delete();
    }

    public function getByCode(string $code): ?CostCenter
    {
        return $this->model->where('code', $code)->first();
    }
}