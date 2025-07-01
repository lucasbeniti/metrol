<?php

namespace App\Http\Services\Log;

use App\Http\Repositories\Log\LogRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class LogService implements LogServiceInterface
{
    protected LogRepositoryInterface $logRepository;

    public function __construct(LogRepositoryInterface $logRepository)
    {
        $this->logRepository = $logRepository;
    }

    public function getAll(): Collection
    {
        return $this->logRepository->getAll();
    }
}