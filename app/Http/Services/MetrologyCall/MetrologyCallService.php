<?php

namespace App\Http\Services\MetrologyCall;

use App\Enums\LogActionsEnum;
use App\Enums\LogTablesEnum;
use App\Http\Repositories\MetrologyCall\MetrologyCallRepositoryInterface;
use App\Http\Services\Log\LogServiceInterface;
use App\Models\MetrologyCall;
use App\Traits\LogsTrait;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class MetrologyCallService implements MetrologyCallServiceInterface
{
    use LogsTrait;

    protected MetrologyCallRepositoryInterface $metrologyCallRepository;
    protected LogServiceInterface $logService;

    public function __construct(MetrologyCallRepositoryInterface $metrologyCallRepository, LogServiceInterface $logService)
    {
        $this->metrologyCallRepository = $metrologyCallRepository;
        $this->logService = $logService;
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
        $data['metrology_call_status_id'] = 3;
        $data['opened_by_user_id'] = Auth::user()->id;

        $metrologyCall = $this->metrologyCallRepository->store($data);

        $this->storeLog(
            $this->logService,
            LogActionsEnum::CREATE,
            'chamado de metrologia',
            $metrologyCall->id,
            LogTablesEnum::METROLOGY_CALLS,
            $this->getMetrologyCallLogDetails($metrologyCall)
        );

        return $metrologyCall;
    }

    public function update(int $id, array $data): bool
    {
        $success = $this->metrologyCallRepository->update($id, $data);

        $metrologyCall = $this->getById($id);

        $this->storeLog(
            $this->logService,
            LogActionsEnum::UPDATE,
            'chamado de metrologia',
            $metrologyCall->id,
            LogTablesEnum::METROLOGY_CALLS,
            $this->getMetrologyCallLogDetails($metrologyCall)
        );

        return $success;
    }

    public function destroy(int $id): bool
    {
        $success = $this->metrologyCallRepository->destroy($id);

        $this->storeLog(
            $this->logService,
            LogActionsEnum::UPDATE,
            'chamado de metrologia',
            $id,
            LogTablesEnum::METROLOGY_CALLS
        );

        return $success;
    }

    public function export(): BinaryFileResponse
    {
        return $this->metrologyCallRepository->export();
    }

    private function getMetrologyCallLogDetails(MetrologyCall $metrologyCall): array
    {
        return [
            'machine_id' => $metrologyCall->machine_id,
            'operation_id' => $metrologyCall->operation_id,
            'opened_by_user_id' => $metrologyCall->opened_by_user_id,
            'metrology_call_type_id' => $metrologyCall->metrology_call_type_id,
            'closed_by_user_id' => $metrologyCall->closed_by_user_id,
            'metrology_call_status_id' => $metrologyCall->metrology_call_status_id,
            'closed_at' => $metrologyCall->closed_at
        ];
    }
}