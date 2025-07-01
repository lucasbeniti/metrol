<?php

namespace App\Http\Services\Machine;

use App\Http\Repositories\Machine\MachineRepositoryInterface;
use App\Models\Machine;
use Exception;
use Illuminate\Database\Eloquent\Collection;

class MachineService implements MachineServiceInterface
{
    protected MachineRepositoryInterface $machineRepository;

    public function __construct(MachineRepositoryInterface $machineRepository)
    {
        $this->machineRepository = $machineRepository;
    }

    public function getAll(): Collection
    {
        return $this->machineRepository->getAll();
    }

    public function getById(int $id): ?Machine
    {
        return $this->machineRepository->getById($id);
    }

    public function store(array $data): Machine
    {
        $machineWithCodeAlreadyExists = $this->machineRepository->getByCode($data['code']);

        if ($machineWithCodeAlreadyExists) {
            throw new Exception('Já existe uma máquina com esse código.');
        }

        return $this->machineRepository->store($data);
    }

    public function update(int $id, array $data): bool
    {
        $machineWithCodeAlreadyExists = $this->machineRepository->getByCode($data['code']);

        if ($machineWithCodeAlreadyExists) {
            throw new Exception('Já existe uma máquina com esse código.');
        }

        return $this->machineRepository->update($id, $data);
    }

    public function destroy(int $id): bool
    {
        $machine = $this->getById($id);

        if ($machine->metrologyCalls()->count() > 0) {
            throw new Exception('Não é possível excluir uma máquina que possui chamados de metrologia associadas.');
        }

        return $this->machineRepository->destroy($id);
    }
}