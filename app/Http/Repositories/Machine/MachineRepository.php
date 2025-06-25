<?php

namespace App\Http\Repositories\Machine;

use App\Exports\MachineExport;
use App\Models\Machine;
use Illuminate\Database\Eloquent\Collection;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class MachineRepository implements MachineRepositoryInterface 
{
    protected Machine $model;

    public function __construct(Machine $machine)
    {
        $this->model = $machine;
    }

    public function getAll(): Collection
    {
        return $this->model->with(['operation'])->get();
    }

    public function getById(int $id): ?Machine
    {
        return $this->model->find($id);
    }

    public function store(array $data): Machine
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data): bool
    {
        $machine = $this->getById($id);

        if (!$machine) {
            return false;
        }

        return $machine->update($data);
    }

    public function destroy(int $id): bool
    {
        $machine = $this->getById($id);

        if (!$machine) {
            return false;
        }

        return $machine->delete();
    }

    public function export(): BinaryFileResponse
    {
        return Excel::download(new MachineExport, "máquinas.xlsx");
    }
}