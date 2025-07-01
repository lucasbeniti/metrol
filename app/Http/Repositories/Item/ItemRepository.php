<?php

namespace App\Http\Repositories\Item;

use App\Models\Item;
use Illuminate\Database\Eloquent\Collection;

class ItemRepository implements ItemRepositoryInterface
{
    protected Item $model;

    public function __construct(Item $item)
    {
        $this->model = $item;
    }

    public function getAll(): Collection
    {
        return $this->model->with('costCenter')->get();
    }

    public function getById(int $id): ?Item
    {
        return $this->model->find($id);
    }

    public function store(array $data): Item
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data): bool
    {
        $item = $this->getById($id);

        if (!$item) {
            return false;
        }

        return $item->update($data);
    }

    public function destroy(int $id): bool
    {
        $item = $this->getById($id);

        if (!$item) {
            return false;
        }

        return $item->delete();
    }

    public function getByCode(string $code): ?Item
    {
        return $this->model->where('code', $code)->first();
    }
}