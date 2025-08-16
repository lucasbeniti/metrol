<?php

namespace App\Http\Services\Dashboard;


interface DashboardServiceInterface
{
    public function countItemsWaitingForMeasurement(): int;
    public function countAverageTimeForMeasurement(): float;
    public function countItemsMeasuredToday(): int;
}