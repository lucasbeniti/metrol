<?php

namespace App\Http\Services\Dashboard;

use App\Enums\MetrologyCallStatusesEnum;
use App\Enums\MetrologyCallTypesEnum;
use App\Http\Repositories\MetrologyCall\MetrologyCallRepositoryInterface;
use App\Http\Services\Dashboard\DashboardServiceInterface;

class DashboardService implements DashboardServiceInterface
{
    public function __construct(
        private MetrologyCallRepositoryInterface $metrologyCallRepository
    ) {}

    public function countItemsWaitingForMeasurement(): int
    {
        return $this->metrologyCallRepository
            ->getAll()
            ->where('metrology_call_status_id', MetrologyCallStatusesEnum::WAITING_MEASUREMENT)
            ->count();
    }

    public function countAverageTimeForMeasurement(): float
    {
        $closedCalls = $this->metrologyCallRepository
            ->getAll()
            ->filter(fn($call) => $call->closed_at && ($call->created_at->isToday() && $call->closed_at->isToday()));

        if ($closedCalls->isEmpty()) {
            return 0;
        }

        $totalMinutes = $closedCalls->sum(fn($call) => $call->received_at->diffInMinutes($call->closed_at));

        return $totalMinutes / $closedCalls->count();
    }

    public function countItemsMeasuredToday(): int
    {
        return $this->metrologyCallRepository
            ->getAll()
            ->filter(fn($call) => $call->closed_at && $call->closed_at->isToday())
            ->count();
    }

    public function countItemsWaitingForMeasurementByType(): array
    {
        return $this->metrologyCallRepository->getAll()
            ->where('metrology_call_status_id', MetrologyCallStatusesEnum::WAITING_MEASUREMENT)
            ->groupBy('metrology_call_type_id')
            ->map(fn($group, $type) => [
                'typeId' => (int) $type,
                'type' => MetrologyCallTypesEnum::label((int) $type),
                'total' => $group->count()
            ])
            ->values()
            ->toArray();
    }

    public function getTop5Clients(): array
    {
        return $this->metrologyCallRepository->getAll()
            ->map(fn($call) => (object) [
                'clientId' => $call->operation->item->costCenter->client->id,
                'clientName' => $call->operation->item->costCenter->client->name
            ])
            ->groupBy('clientId')
            ->map(fn($group) => (object) [
                'label' => $group->first()->clientName,
                'Quantidade' => $group->count()
            ])
            ->sortByDesc(fn($client) => $client->Quantidade)
            ->take(5)
            ->values()
            ->toArray();
    }

    public function getTop5CostCenters(): array
    {
        return $this->metrologyCallRepository->getAll()
            ->map(fn($call) => (object) [
                'costCenterId' => $call->operation->item->costCenter->id,
                'costCenterName' => "{$call->operation->item->costCenter->name} ({$call->operation->item->costCenter->client->name})"
            ])
            ->groupBy('costCenterId')
            ->map(fn($group) => (object) [
                'label' => $group->first()->costCenterName,
                'Quantidade' => $group->count()
            ])
            ->sortByDesc(fn($costCenter) => $costCenter->Quantidade)
            ->take(5)
            ->values()
            ->toArray();
    }

    public function getTop5Operations(): array
    {
        return $this->metrologyCallRepository->getAll()
            ->map(fn($call) => (object) [
                'operationId' => $call->operation->id,
                'operationName' => "{$call->operation->name} ({$call->operation->item->name})"
            ])
            ->groupBy('operationId')
            ->map(fn($group) => (object) [
                'label' => $group->first()->operationName,
                'Quantidade' => $group->count()
            ])
            ->sortByDesc(fn($operation) => $operation->Quantidade)
            ->take(5)
            ->values()
            ->toArray();
    }
}
