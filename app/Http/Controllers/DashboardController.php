<?php

namespace App\Http\Controllers;

use App\Http\Services\Dashboard\DashboardServiceInterface;
use Inertia\Response;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(
        private DashboardServiceInterface $dashboardService
    ) {}

    public function index(): Response
    {
        $itemsWaitingForMeasurement = $this->dashboardService->countItemsWaitingForMeasurement();
        $averageTimeForMeasurement = $this->dashboardService->countAverageTimeForMeasurement();
        $itemsMeasuredToday = $this->dashboardService->countItemsMeasuredToday();
        $itemsWaitingForMeasurementByType = $this->dashboardService->countItemsWaitingForMeasurementByType();
        $top5Clients = $this->dashboardService->getTop5Clients();
        $top5CostCenters = $this->dashboardService->getTop5CostCenters();
        $top5Operations = $this->dashboardService->getTop5Operations();

        return Inertia::render('dashboard', [
            'itemsWaitingForMeasurement' => $itemsWaitingForMeasurement,
            'averageTimeForMeasurement' => $averageTimeForMeasurement,
            'itemsMeasuredToday' => $itemsMeasuredToday,
            'itemsWaitingForMeasurementByType' => $itemsWaitingForMeasurementByType,
            'top5Clients' => $top5Clients,
            'top5CostCenters' => $top5CostCenters,
            'top5Operations' => $top5Operations
        ]);
    }
}
