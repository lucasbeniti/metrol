<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Requests\UpsertMetrologyCallRequest;
use App\Http\Services\Item\ItemServiceInterface;
use App\Http\Services\Machine\MachineServiceInterface;
use App\Http\Services\MetrologyCall\MetrologyCallServiceInterface;
use App\Http\Services\Operation\OperationServiceInterface;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class MetrologyCallController extends Controller
{
    protected MetrologyCallServiceInterface $metrologyCallService;
    protected MachineServiceInterface $machineService;
    protected OperationServiceInterface $operationService;
    protected ItemServiceInterface $itemService;

    public function __construct(
        MetrologyCallServiceInterface $metrologyCallService,
        MachineServiceInterface $machineService,
        OperationServiceInterface $operationService,
        ItemServiceInterface $itemService
    ) {
        $this->metrologyCallService = $metrologyCallService;
        $this->machineService = $machineService;
        $this->operationService = $operationService;
        $this->itemService = $itemService;
    }

    public function index(): Response 
    {
        $items = $this->itemService->getAll();
        $firstItem = $items->first();

        return Inertia::render('metrology-calls', [
            'metrologyCalls' => $this->metrologyCallService->getAll(),
            'machines' => $this->machineService->getAll(),
            'operations' => $this->operationService->getAll($firstItem->id),
            'items' => $items
        ]);
    }

    public function store(UpsertMetrologyCallRequest $request): RedirectResponse 
    {
        $data = $request->validated();
        
        $this->metrologyCallService->store($data);
        
        return redirect()->route('metrology-calls.index');
    }

    public function update($id, UpsertMetrologyCallRequest $request): RedirectResponse 
    {
        $this->metrologyCallService->update($id, $request->validated());

        return redirect()->route('metrology-calls.index');
    }

    public function destroy($id): RedirectResponse 
    {
        $this->metrologyCallService->destroy($id);

        return redirect()->route('metrology-calls.index');
    }

    public function export(): BinaryFileResponse 
    {
        return $this->metrologyCallService->export();
    }
}
