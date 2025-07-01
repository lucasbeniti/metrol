<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Requests\UpsertOperationRequest;
use App\Http\Services\Item\ItemServiceInterface;
use App\Http\Services\Operation\OperationServiceInterface;
use Exception;
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
        try {
            $this->operationService->store($request->validated());

            return redirect()->route('items.operations.index', [
                'itemId' => $request['item_id']
            ]);
        } catch (Exception $e) {
            if ($e->getMessage() === 'Já existe uma operação com esse código.') {
                return redirect()->back()->withErrors(['error' => $e->getMessage()])->withInput();
            }

            return redirect()->back()->withErrors(['error' => 'Erro interno do servidor. Tente novamente mais tarde.'])->withInput();
        }
    }

    public function update($itemId, $operationId, UpsertOperationRequest $request): RedirectResponse 
    {
        try {
            $this->operationService->update($itemId, $operationId, $request->validated());

            return redirect()->route('items.operations.index', [
                'itemId' => $itemId
            ]);
        } catch (Exception $e) {
            if ($e->getMessage() === 'Já existe uma operação com esse código.') {
                return redirect()->back()->withErrors(['error' => $e->getMessage()])->withInput();
            }

            return redirect()->back()->withErrors(['error' => 'Erro interno do servidor. Tente novamente mais tarde.'])->withInput();
        }
    }

    public function destroy($itemId, $operationId): RedirectResponse 
    {
        try {
            $this->operationService->destroy($itemId, $operationId);

            return redirect()->route('items.operations.index', [
                'itemId' => $itemId
            ]);
        } catch (Exception $e) {
            if ($e->getMessage() === 'Não é possível excluir uma operação que possui chamados de metrologia ou máquinas associadas.') {
                return redirect()->back()->withErrors(['error' => $e->getMessage()])->withInput();
            }

            return redirect()->back()->withErrors(['error' => 'Erro interno do servidor. Tente novamente mais tarde.'])->withInput();
        }
    }
}
