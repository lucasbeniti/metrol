<?php

namespace App\Http\Services\Machine;

use App\Http\Repositories\Machine\MachineRepositoryInterface;
use App\Models\Machine;
use Illuminate\Database\Eloquent\Collection;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

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
        return $this->machineRepository->store($data);
    }

    public function update(int $id, array $data): bool
    {
        return $this->machineRepository->update($id, $data);
    }

    public function destroy(int $id): bool
    {
        return $this->machineRepository->destroy($id);
    }

    public function export(): BinaryFileResponse
    {
        return $this->machineRepository->export();
    }
}