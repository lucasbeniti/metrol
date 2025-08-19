<?php

namespace App\Http\Services\Item;

use App\Enums\LogActionsEnum;
use App\Enums\LogEntitiesEnum;
use App\Enums\LogTablesEnum;
use App\Exceptions\Item\ItemAlreadyExistsException;
use App\Exceptions\Item\ItemCannotBeDeletedException;
use App\Http\Repositories\Item\ItemRepositoryInterface;
use App\Models\Item;
use App\Traits\LogsTrait;
use Illuminate\Database\Eloquent\Collection;

class ItemService implements ItemServiceInterface
{
    use LogsTrait;

    public function __construct(
        private ItemRepositoryInterface $itemRepository
    ) {
        $this->initializeLogsTrait();
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
            throw new ItemAlreadyExistsException();
        }

        $item = $this->itemRepository->store($data);

        $this->storeLog(
            LogActionsEnum::CREATE,
            LogEntitiesEnum::ITEMS,
            $item->name,
            LogTablesEnum::ITEMS,
            $this->getItemLogDetails($item)
        );

        return $item;
    }

    public function update(int $id, array $data): bool
    {
        $itemWithCodeAlreadyExists = $this->itemRepository->getByCode($data['code']);

        if ($itemWithCodeAlreadyExists && $itemWithCodeAlreadyExists->id !== $id) {
            throw new ItemAlreadyExistsException();
        }

        $success = $this->itemRepository->update($id, $data);

        $item = $this->getById($id);

        if ($success) {
            $this->storeLog(
                LogActionsEnum::UPDATE,
                LogEntitiesEnum::ITEMS,
                $data['name'],
                LogTablesEnum::ITEMS,
                $this->getItemLogDetails($item)
            );
        }

        return $success;
    }

    public function destroy(int $id): bool
    {
        $item = $this->itemRepository->getById($id);

        $itemName = $item->name;

        if ($item->operations()->count() > 0) {
            throw new ItemCannotBeDeletedException();
        }

        $success = $this->itemRepository->destroy($id);

        if ($success) {
            $this->storeLog(
                LogActionsEnum::DELETE,
                LogEntitiesEnum::ITEMS,
                $itemName,
                LogTablesEnum::ITEMS
            );
        }

        return $success;
    }

    private function getItemLogDetails(Item $item): array
    {
        return [
            'name' => $item->name,
            'code' => $item->code,
            'cost_center' => $item->costCenter->name
        ];
    }
}