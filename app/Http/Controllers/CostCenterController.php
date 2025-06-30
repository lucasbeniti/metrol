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
    protected CostCenterServiceInterface $costCenterService;
    protected ClientServiceInterface $clientService;

    public function __construct(CostCenterServiceInterface $costCenterService, ClientServiceInterface $clientService)
    {
        $this->costCenterService = $costCenterService;
        $this->clientService = $clientService;
    }

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

    public function update($id, UpsertCostCenterRequest $request): RedirectResponse
    {
        $this->costCenterService->update($id, $request->validated());

        return redirect()->route('cost-centers.index');
    }

    public function destroy($id): RedirectResponse
    {
        $this->costCenterService->destroy($id);

        return redirect()->route('cost-centers.index');
    }
}
