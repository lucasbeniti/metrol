<?php

namespace App\Http\Services\Dashboard;

use App\Enums\MetrologyCallStatusesEnum;
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
            ->filter(fn($call) => $call->closed_at);

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
}
