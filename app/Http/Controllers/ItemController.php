<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertItemRequest;
use App\Http\Services\CostCenter\CostCenterServiceInterface;
use App\Http\Services\Item\ItemServiceInterface;
use Exception;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

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
        try {
            $this->itemService->store($request->validated());

            return redirect()->route('cost-centers.index');
        } catch (Exception $e) {
            if ($e->getMessage() === 'Já existe um item com esse código.') {
                return redirect()->back()->withErrors(['error' => $e->getMessage()])->withInput();
            }

            return redirect()->back()->withErrors(['error' => 'Erro interno do servidor. Tente novamente mais tarde.'])->withInput();
        }
    }

    public function update($id, UpsertItemRequest $request): RedirectResponse
    {
        try {
            $this->itemService->update($id, $request->validated());

            return redirect()->route('items.index');
        } catch (Exception $e) {
            if ($e->getMessage() === 'Já existe um item com esse código.') {
                return redirect()->back()->withErrors(['error' => $e->getMessage()])->withInput();
            }

            return redirect()->back()->withErrors(['error' => 'Erro interno do servidor. Tente novamente mais tarde.'])->withInput();
        }
    }

    public function destroy($id): RedirectResponse
    {
        try {
            $this->itemService->destroy($id);

            return redirect()->route('items.index');
        } catch (Exception $e) {
            if ($e->getMessage() === 'Não é possível excluir um item que possui operações associadas.') {
                return redirect()->back()->withErrors(['error' => $e->getMessage()])->withInput();
            }

            return redirect()->back()->withErrors(['error' => 'Erro interno do servidor. Tente novamente mais tarde.'])->withInput();
        }
    }
}
