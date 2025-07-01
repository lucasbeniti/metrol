<?php

namespace App\Http\Controllers;

use App\Http\Services\Log\LogServiceInterface;
use App\Models\Log;
use Inertia\Response;
use Inertia\Inertia;

class LogController extends Controller
{
    protected LogServiceInterface $logService;

    public function __construct(LogServiceInterface $logService)
    {
        $this->logService = $logService;
    }

    public function index(): Response
    {
        return Inertia::render('logs', [
            'logs' => $this->logService->getAll()
        ]);
    }
}
