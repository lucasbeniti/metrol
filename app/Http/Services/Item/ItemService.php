<?php

namespace App\Http\Services\Item;

use App\Http\Repositories\Item\ItemRepositoryInterface;
use App\Models\Item;
use Illuminate\Database\Eloquent\Collection;

class ItemService implements ItemServiceInterface
{
    protected ItemRepositoryInterface $itemRepository;

    public function __construct(ItemRepositoryInterface $itemRepository)
    {
        $this->itemRepository = $itemRepository;
    }

    public function getAll(): Collection
    {
        return $this->itemRepository->getAll();
    }

    public function getById(int $id): ?Item
    {
        return $this->itemRepository->getById($id);
    }

    public function store(array $data): Item
    {
        return $this->itemRepository->store($data);
    }

    public function update(int $id, array $data): bool
    {
        return $this->itemRepository->update($id, $data);
    }

    public function destroy(int $id): bool
    {
        return $this->itemRepository->destroy($id);
    }
}