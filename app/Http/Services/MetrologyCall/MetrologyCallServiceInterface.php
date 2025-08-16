<?php

namespace App\Http\Services\MetrologyCall;

use App\Models\MetrologyCall;
use Illuminate\Database\Eloquent\Collection;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

interface MetrologyCallServiceInterface
{
    public function getAll(): Collection;
    public function getById(int $id): ?MetrologyCall;
    public function store(array $data): MetrologyCall;
    public function update(int $id, array $data): bool;
    public function destroy(int $id): bool;
    public function export(): BinaryFileResponse;
    public function receiveItem(int $id): bool;
    public function close(int $id, int $status): bool;
}