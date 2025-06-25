<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertItemRequest;
use App\Http\Services\CostCenter\CostCenterServiceInterface;
use App\Http\Services\Item\ItemServiceInterface;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ItemController extends Controller
{
    protected ItemServiceInterface $itemService;
    protected CostCenterServiceInterface $costCenterService;

    public function __construct(ItemServiceInterface $itemService, CostCenterServiceInterface $costCenterService)
    {
        $this->itemService = $itemService;
        $this->costCenterService = $costCenterService;
    }

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

    public function update($id, UpsertItemRequest $request): RedirectResponse
    {
        $this->itemService->update($id, $request->validated());

        return redirect()->route('items.index');
    }

    public function destroy($id): RedirectResponse
    {
        $this->itemService->destroy($id);

        return redirect()->route('items.index');
    }

    public function export(): BinaryFileResponse
    {
        return $this->itemService->export();
    }
}
