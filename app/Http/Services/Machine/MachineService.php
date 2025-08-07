<?php

namespace App\Http\Services\Machine;

use App\Enums\LogActionsEnum;
use App\Enums\LogEntitiesEnum;
use App\Enums\LogTablesEnum;
use App\Http\Repositories\Machine\MachineRepositoryInterface;
use App\Models\Machine;
use App\Traits\LogsTrait;
use Exception;
use Illuminate\Database\Eloquent\Collection;

class MachineService implements MachineServiceInterface
{
    use LogsTrait;

    protected MachineRepositoryInterface $machineRepository;

    public function __construct(MachineRepositoryInterface $machineRepository)
    {
        $this->machineRepository = $machineRepository;
        $this->initializeLogsTrait();
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

        $machine = $this->machineRepository->store($data);

        $this->storeLog(
            LogActionsEnum::CREATE,
            LogEntitiesEnum::MACHINES,
            $machine->name,
            LogTablesEnum::MACHINES,
            $this->getMachineLogDetails($machine)
        );

        return $machine;
    }

    public function update(int $id, array $data): bool
    {
        $machineWithCodeAlreadyExists = $this->machineRepository->getByCode($data['code']);

        if ($machineWithCodeAlreadyExists && $machineWithCodeAlreadyExists->id !== $id) {
            throw new Exception('Já existe uma máquina com esse código.');
        }

        $success = $this->machineRepository->update($id, $data);

        $machine = $this->getById($id);

        if ($success) {
            $this->storeLog(
                LogActionsEnum::UPDATE,
                LogEntitiesEnum::MACHINES,
                $data['name'],
                LogTablesEnum::MACHINES,
                $this->getMachineLogDetails($machine)
            );
        }

        return $success;
    }

    public function destroy(int $id): bool
    {
        $machine = $this->getById($id);

        $machineName = $machine->name;

        if ($machine->metrologyCalls()->count() > 0) {
            throw new Exception('Não é possível excluir uma máquina que possui chamados de metrologia associadas.');
        }

        $success = $this->machineRepository->destroy($id);

        if ($success) {
            $this->storeLog(
                LogActionsEnum::DELETE,
                LogEntitiesEnum::MACHINES,
                $machineName,
                LogTablesEnum::MACHINES
            );
        }

        return $success;
    }

    private function getMachineLogDetails(Machine $machine): array
    {
        return [
            'name' => $machine->name,
            'code' => $machine->code,
            'operation' => $machine->operation->name
        ];
    }
}