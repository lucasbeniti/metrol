<?php

namespace App\Http\Controllers;

use App\Http\Services\Log\LogServiceInterface;
use App\Http\Services\User\UserServiceInterface;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class LogController extends Controller
{
    public function __construct(
        private LogServiceInterface $logService, 
        private UserServiceInterface $userService
    ) {}

    public function index(Request $request): Response
    {
        return Inertia::render('logs', [
            'logs' => $this->logService->getAll($request),
            'users' => $this->userService->getAll(),
            'filters' => $request->all()
        ]);
    }

    public function store(array $data): void
    {
        $this->logService->store($data);
    }
}
