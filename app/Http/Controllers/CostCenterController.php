<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertCostCenterRequest;
use App\Http\Services\Client\ClientServiceInterface;
use App\Http\Services\CostCenter\CostCenterServiceInterface;
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
        $this->costCenterService->store($request->validated());

        return redirect()->route('cost-centers.index');
    }

    public function update(int $id, UpsertCostCenterRequest $request): RedirectResponse
    {
        $this->costCenterService->update($id, $request->validated());
        
        return redirect()->route('cost-centers.index');
    }

    public function destroy(int $id): RedirectResponse
    {
        $this->costCenterService->destroy($id);

        return redirect()->route('cost-centers.index');
    }
}
