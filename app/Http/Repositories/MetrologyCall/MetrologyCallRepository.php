<?php

namespace App\Http\Repositories\MetrologyCall;

use App\Exports\MetrologyCallExport;
use App\Models\MetrologyCall;
use Illuminate\Database\Eloquent\Collection;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class MetrologyCallRepository implements MetrologyCallRepositoryInterface
{
    protected MetrologyCall $model;

    public function __construct(MetrologyCall $metrologyCall)
    {
        return $this->model = $metrologyCall;
    }

    public function getAll(): Collection
    {
        
        return $this->model->with(['machine', 'operation.item', 'type', 'status'])->orderBy('id', 'desc')->get();
    }

    public function getById(int $id): ?MetrologyCall
    {
        return $this->model->find($id);
    }

    public function store(array $data): MetrologyCall
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data): bool
    {
        $metrologyCall = $this->getById($id);

        if (!$metrologyCall) {
            return false;
        }

        return $metrologyCall->update($data);
    }

    public function destroy(int $id): bool
    {
        $metrologyCall = $this->getById($id);

        if (!$metrologyCall) {
            return false;
        }

        return $metrologyCall->delete();
    }

    public function export(): BinaryFileResponse
    {
        return Excel::download(MetrologyCallExport::class, 'chamados_de_metrologia.xlsx');
    }
}