<?php

namespace App\Http\Services\MetrologyCall;

use App\Enums\LogActionsEnum;
use App\Enums\LogEntitiesEnum;
use App\Enums\LogTablesEnum;
use App\Enums\MetrologyCallStatusesEnum;
use App\Http\Repositories\MetrologyCall\MetrologyCallRepositoryInterface;
use App\Models\MetrologyCall;
use App\Traits\LogsTrait;
use App\Utils\DateUtils;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class MetrologyCallService implements MetrologyCallServiceInterface
{
    use LogsTrait;

    public function __construct(
        private MetrologyCallRepositoryInterface $metrologyCallRepository
    ) {
        $this->initializeLogsTrait();
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
            LogActionsEnum::CREATE,
            LogEntitiesEnum::METROLOGY_CALLS,
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
            LogActionsEnum::UPDATE,
            LogEntitiesEnum::METROLOGY_CALLS,
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
            LogActionsEnum::UPDATE,
            LogEntitiesEnum::METROLOGY_CALLS,
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
            'machine' => $metrologyCall->machine->name,
            'operation' => $metrologyCall->operation->name,
            'opened_by_user' => $metrologyCall->openedByUser->name,
            'metrology_call_type' => $metrologyCall->type->name,
            'closed_by_user' => $metrologyCall->closed_by_user_id ? $metrologyCall->closedByUser->name : 'N/A',
            'metrology_call_status' => $metrologyCall->status->name,
            'received_at' => DateUtils::formatDate($metrologyCall->received_at),
            'closed_at' => DateUtils::formatDate($metrologyCall->closed_at)
        ];
    }

    public function receiveItem(int $id): bool
    {
        return $this->metrologyCallRepository->receiveItem($id);
    }

    public function close(int $id, int $status): bool
    {
        return $this->metrologyCallRepository->close($id, $status);
    }
}