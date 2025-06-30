<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Requests\UpsertOperationRequest;
use App\Http\Services\Item\ItemServiceInterface;
use App\Http\Services\Operation\OperationServiceInterface;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class OperationController extends Controller
{
    protected OperationServiceInterface $operationService;
    protected ItemServiceInterface $itemService;

    public function __construct(OperationServiceInterface $operationService, ItemServiceInterface $itemService)
    {
        $this->operationService = $operationService;
        $this->itemService = $itemService;
    }

    public function index($itemId): Response 
    {
        return Inertia::render('operations', [
            'operations' => $this->operationService->getAll($itemId),
            'item' => $this->itemService->getById($itemId)
        ]);
    }

    public function store(UpsertOperationRequest $request): RedirectResponse 
    {
        $this->operationService->store($request->validated());
        
        return redirect()->route('items.operations.index', [
            'itemId' => $request['item_id']
        ]);
    }

    public function update($itemId, $operationId, UpsertOperationRequest $request): RedirectResponse 
    {
        $this->operationService->update($itemId, $operationId, $request->validated());

        return redirect()->route('items.operations.index', [
            'itemId' => $itemId
        ]);
    }

    public function destroy($itemId, $operationId): RedirectResponse 
    {
        $this->operationService->destroy($itemId, $operationId);

        return redirect()->route('items.operations.index', [
            'itemId' => $itemId
        ]);
    }
}
