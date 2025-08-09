<?php

namespace App\Http\Services\Log;

use App\Http\Repositories\Log\LogRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class LogService implements LogServiceInterface
{
    public function __construct(
        private LogRepositoryInterface $logRepository
    ) {
        $this->logRepository = $logRepository;
    }

    public function getAll(Request $request): Collection
    {
        return $this->logRepository->getAll($request);
    }

    public function store(array $data): void
    {
        $this->logRepository->store($data);
    }
}