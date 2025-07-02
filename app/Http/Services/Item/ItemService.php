<?php

namespace App\Http\Services\Item;

use App\Enums\LogActionsEnum;
use App\Enums\LogTablesEnum;
use App\Http\Repositories\Item\ItemRepositoryInterface;
use App\Http\Services\Log\LogServiceInterface;
use App\Models\Item;
use App\Traits\LogsTrait;
use Exception;
use Illuminate\Database\Eloquent\Collection;

class ItemService implements ItemServiceInterface
{
    use LogsTrait;

    protected ItemRepositoryInterface $itemRepository;
    protected LogServiceInterface $logService;

    public function __construct(ItemRepositoryInterface $itemRepository, LogServiceInterface $logService)
    {
        $this->itemRepository = $itemRepository;
        $this->logService = $logService;
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

        $item = $this->itemRepository->store($data);

        $this->storeLog(
            $this->logService,
            LogActionsEnum::CREATE,
            'item',
            $item->name,
            LogTablesEnum::ITEMS
        );

        return $item;
    }

    public function update(int $id, array $data): bool
    {
        $itemWithCodeAlreadyExists = $this->itemRepository->getByCode($data['code']);

        if ($itemWithCodeAlreadyExists && $itemWithCodeAlreadyExists->id !== $id) {
            throw new Exception('Já existe um item com esse código.');
        }

        $success = $this->itemRepository->update($id, $data);

        if ($success) {
            $this->storeLog(
                $this->logService,
                LogActionsEnum::UPDATE,
                'item',
                $data['name'],
                LogTablesEnum::ITEMS
            );
        }

        return $success;
    }

    public function destroy(int $id): bool
    {
        $item = $this->itemRepository->getById($id);

        if ($item->operations()->count() > 0) {
            throw new Exception('Não é possível excluir um item que possui operações associadas.');
        }

        $success = $this->itemRepository->destroy($id);

        if ($success) {
            $this->storeLog(
                $this->logService,
                LogActionsEnum::DELETE,
                'item',
                $item->name,
                LogTablesEnum::ITEMS
            );
        }

        return $success;
    }
}