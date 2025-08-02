<?php

namespace App\Http\Repositories\MetrologyCall;

use App\Enums\MetrologyCallStatusesEnum;
use App\Enums\UserRolesEnum;
use App\Exports\MetrologyCallExport;
use App\Models\MetrologyCall;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
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
        $authenticatedUser = Auth::user();

        return $this->model->with(['machine', 'operation.item', 'type', 'status'])
            ->when($authenticatedUser->user_role_id === UserRolesEnum::METROLOGIST, function ($query) {
                $query->orderByRaw("
                    FIELD(metrology_call_status_id, 3, 4) DESC
                ")->orderByRaw("
                    FIELD(metrology_call_type_id, 2) ASC
                ");
            })
            ->orderBy('id', 'desc')
            ->get();
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
        return Excel::download(new MetrologyCallExport, 'chamados_de_metrologia.xlsx');
    }

    public function receiveItem(int $id): bool
    {
        $metrologyCall = $this->getById($id);

        if (!$metrologyCall) {
            return false;
        }

        $authenticatedUser = Auth::user();
        
        return $metrologyCall->update([
            'metrology_call_status_id' => MetrologyCallStatusesEnum::WAITING_MEASUREMENT,
            'closed_by_user_id' => $authenticatedUser->id,
            'received_at' => now()
        ]);
    }
}