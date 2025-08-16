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

        return Inertia::render('dashboard', [
            'itemsWaitingForMeasurement' => $itemsWaitingForMeasurement,
            'averageTimeForMeasurement' => $averageTimeForMeasurement,
            'itemsMeasuredToday' => $itemsMeasuredToday
        ]);
    }
}
