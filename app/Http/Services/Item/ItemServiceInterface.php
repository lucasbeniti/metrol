<?php

namespace App\Http\Services\Item;

use App\Models\Item;
use Illuminate\Database\Eloquent\Collection;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

interface ItemServiceInterface
{
    public function getAll(): Collection;
    public function getById(int $id): ?Item;
    public function store(array $data): Item;
    public function update(int $id, array $data): bool;
    public function destroy(int $id): bool;
    public function export(): BinaryFileResponse;
}