<?php

namespace App\Http\Services\Machine;

use App\Enums\LogActionsEnum;
use App\Enums\LogTablesEnum;
use App\Http\Repositories\Machine\MachineRepositoryInterface;
use App\Http\Services\Log\LogServiceInterface;
use App\Models\Machine;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class MachineService implements MachineServiceInterface
{
    protected MachineRepositoryInterface $machineRepository;
    protected LogServiceInterface $logService;

    public function __construct(MachineRepositoryInterface $machineRepository, LogServiceInterface $logService)
    {
        $this->machineRepository = $machineRepository;
        $this->logService = $logService;
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

        $authenticatedUser = Auth::user();

        $this->logService->store([
            'user_id' => $authenticatedUser->id,
            'action_id' => LogActionsEnum::CREATE,
            'description' => 'O usuário ' . $authenticatedUser->name . ' criou a máquina: ' . $machine->name,
            'table_id' => LogTablesEnum::OPERATIONS,
        ]);

        return $machine;
    }

    public function update(int $id, array $data): bool
    {
        $machineWithCodeAlreadyExists = $this->machineRepository->getByCode($data['code']);

        if ($machineWithCodeAlreadyExists) {
            throw new Exception('Já existe uma máquina com esse código.');
        }

        $success = $this->machineRepository->update($id, $data);

        if ($success) {
            $authenticatedUser = Auth::user();

            $this->logService->store([
                'user_id' => $authenticatedUser->id,
                'action_id' => LogActionsEnum::UPDATE,
                'description' => 'O usuário ' . $authenticatedUser->name . ' atualizou a máquina: ' . $data['name'],
                'table_id' => LogTablesEnum::OPERATIONS,
            ]);
        }

        return $success;
    }

    public function destroy(int $id): bool
    {
        $machine = $this->getById($id);

        if ($machine->metrologyCalls()->count() > 0) {
            throw new Exception('Não é possível excluir uma máquina que possui chamados de metrologia associadas.');
        }

        $success = $this->machineRepository->destroy($id);

        if ($success) {
            $authenticatedUser = Auth::user();

            $this->logService->store([
                'user_id' => $authenticatedUser->id,
                'action_id' => LogActionsEnum::DELETE,
                'description' => 'O usuário ' . $authenticatedUser->name . ' deletou a máquina: ' . $machine->name,
                'table_id' => LogTablesEnum::OPERATIONS,
            ]);
        }

        return $success;
    }
}