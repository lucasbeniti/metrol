<?php

namespace App\Http\Services\MetrologyCall;

use App\Http\Repositories\MetrologyCall\MetrologyCallRepositoryInterface;
use App\Models\MetrologyCall;
use Illuminate\Database\Eloquent\Collection;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class MetrologyCallService implements MetrologyCallServiceInterface
{
    protected MetrologyCallRepositoryInterface $metrologyCallRepository;

    public function __construct(MetrologyCallRepositoryInterface $metrologyCallRepository)
    {
        $this->metrologyCallRepository = $metrologyCallRepository;
    }

    public function getAll(): Collection
    {
        return $this->metrologyCallRepository->getAll();
    }

    public function getById(int $id): ?MetrologyCall
    {
        return $this->metrologyCallRepository->getById($id);
    }

    public function store(array $data): MetrologyCall
    {
        return $this->metrologyCallRepository->store($data);
    }

    public function update(int $id, array $data): bool
    {
        return $this->metrologyCallRepository->update($id, $data);
    }

    public function destroy(int $id): bool
    {
        return $this->metrologyCallRepository->destroy($id);
    }

    public function export(): BinaryFileResponse
    {
        return $this->metrologyCallRepository->export();
    }
}