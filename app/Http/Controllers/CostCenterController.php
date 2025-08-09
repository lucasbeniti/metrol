<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertCostCenterRequest;
use App\Http\Services\Client\ClientServiceInterface;
use App\Http\Services\CostCenter\CostCenterServiceInterface;
use Exception;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class CostCenterController extends Controller
{
    public function __construct(
        private CostCenterServiceInterface $costCenterService, 
        private ClientServiceInterface $clientService
    ) {}

    public function index(): Response
    {
        return Inertia::render('cost-centers', [
            'costCenters' => $this->costCenterService->getAll(),
            'clients' => $this->clientService->getAll()
        ]);
    }

    public function store(UpsertCostCenterRequest $request): RedirectResponse
    {
        try {
            $this->costCenterService->store($request->validated());

            return redirect()->route('cost-centers.index');
        } catch (Exception $e) {
            if ($e->getMessage() === 'Já existe um centro de custo com esse código.') {
                return redirect()->back()->withErrors(['error' => $e->getMessage()])->withInput();
            }

            return redirect()->back()->withErrors(['error' => 'Erro interno do servidor. Tente novamente mais tarde.'])->withInput();
        }
    }

    public function update($id, UpsertCostCenterRequest $request): RedirectResponse
    {
        try {
            $this->costCenterService->update($id, $request->validated());

            return redirect()->route('cost-centers.index');
        } catch (Exception $e) {
            if ($e->getMessage() === 'Já existe um centro de custo com esse código.') {
                return redirect()->back()->withErrors(['error' => $e->getMessage()])->withInput();
            }

            return redirect()->back()->withErrors(['error' => 'Erro interno do servidor. Tente novamente mais tarde.'])->withInput();
        }
    }

    public function destroy($id): RedirectResponse
    {
        try {
            $this->costCenterService->destroy($id);

            return redirect()->route('cost-centers.index');
        } catch (Exception $e) {
            if ($e->getMessage() === 'Não é possível excluir um centro de custo que possui items associadas.') {
                return redirect()->back()->withErrors(['error' => $e->getMessage()])->withInput();
            }

            return redirect()->back()->withErrors(['error' => 'Erro interno do servidor. Tente novamente mais tarde.'])->withInput();
        }
    }
}
