<?php

namespace App\Http\Services\User;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

interface UserServiceInterface
{
    public function getAll(): Collection;
    public function getById(int $id): ?User;
    public function store(array $data): User;
    public function update(int $id, array $data): bool;
    public function destroy(int $id): bool;
    public function export(): BinaryFileResponse;
}