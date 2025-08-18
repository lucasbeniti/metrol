<?php

namespace App\Http\Services\Dashboard;


interface DashboardServiceInterface
{
    public function countItemsWaitingForMeasurement(): int;
    public function countAverageTimeForMeasurement(): float;
    public function countItemsMeasuredToday(): int;
    public function countItemsWaitingForMeasurementByType(): array;
    public function getTop5Clients(): array;
    public function getTop5CostCenters(): array;
    public function getTop5Operations(): array;
}