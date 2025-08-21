<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertItemRequest;
use App\Http\Services\CostCenter\CostCenterServiceInterface;
use App\Http\Services\Item\ItemServiceInterface;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class ItemController extends Controller
{
    public function __construct(
        private ItemServiceInterface $itemService, 
        private CostCenterServiceInterface $costCenterService
    ) {}

    public function index(): Response
    {
        return Inertia::render('items', [
            'items' => $this->itemService->getAll(),
            'costCenters' => $this->costCenterService->getAll()
        ]);
    }

    public function store(UpsertItemRequest $request): RedirectResponse
    {
        $this->itemService->store($request->validated());

        return redirect()->route('items.index');
    }

    public function update(int $id, UpsertItemRequest $request): RedirectResponse
    {
        $this->itemService->update($id, $request->validated());

        return redirect()->route('items.index');
    }

    public function destroy(int $id): RedirectResponse
    {
        $this->itemService->destroy($id);

        return redirect()->route('items.index');
    }
}
