<?php

namespace App\Http\Services\Item;

use App\Http\Repositories\Item\ItemRepositoryInterface;
use App\Models\Item;
use Exception;
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
        $itemWithCodeAlreadyExists = $this->itemRepository->getByCode($data['code']);

        if ($itemWithCodeAlreadyExists) {
            throw new Exception('Já existe um item com esse código.');
        }

        return $this->itemRepository->store($data);
    }

    public function update(int $id, array $data): bool
    {
        $itemWithCodeAlreadyExists = $this->itemRepository->getByCode($data['code']);

        if ($itemWithCodeAlreadyExists && $itemWithCodeAlreadyExists->id !== $id) {
            throw new Exception('Já existe um item com esse código.');
        }

        return $this->itemRepository->update($id, $data);
    }

    public function destroy(int $id): bool
    {
        $item = $this->itemRepository->getById($id);

        if ($item->operations()->count() > 0) {
            throw new Exception('Não é possível excluir um item que possui operações associadas.');
        }

        return $this->itemRepository->destroy($id);
    }
}