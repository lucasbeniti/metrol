<?php

namespace App\Http\Repositories\Item;

use App\Models\Item;
use Illuminate\Database\Eloquent\Collection;

interface ItemRepositoryInterface
{
    public function getAll(): Collection;
    public function getById(int $id): ?Item;
    public function store(array $data): Item;
    public function update(int $id, array $data): bool;
    public function destroy(int $id): bool;
}