<?php

namespace App\Http\Services\Client;

use App\Models\Client;
use Illuminate\Database\Eloquent\Collection;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

interface ClientServiceInterface
{
    public function getAll(): Collection;
    public function getById(int $id): ?Client;
    public function store(array $data): Client;
    public function update(int $id, array $data): bool;
    public function destroy(int $id): bool;
    public function export(): BinaryFileResponse;
}