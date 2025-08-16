<?php

namespace App\Http\Controllers;

use App\Enums\MetrologyCallStatusesEnum;
use Inertia\Inertia;
use App\Http\Requests\UpsertMetrologyCallRequest;
use App\Http\Services\Item\ItemServiceInterface;
use App\Http\Services\Machine\MachineServiceInterface;
use App\Http\Services\MetrologyCall\MetrologyCallServiceInterface;
use App\Http\Services\Operation\OperationServiceInterface;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class MetrologyCallController extends Controller
{
    public function __construct(
        private MetrologyCallServiceInterface $metrologyCallService,
        private MachineServiceInterface $machineService,
        private OperationServiceInterface $operationService,
        private ItemServiceInterface $itemService
    ) {}

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

    public function receiveItem($id): RedirectResponse
    {
        $this->metrologyCallService->receiveItem($id);

        return redirect()->route('metrology-calls.index');
    }

    public function close($id, Request $request): RedirectResponse
    {
        $this->metrologyCallService->close($id, $request->status);

        return redirect()->route('metrology-calls.index');
    }
}
