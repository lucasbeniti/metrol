<?php

namespace App\Http\Controllers;

use App\Models\Operation;
use Inertia\Inertia;
use App\Http\Requests\UpsertMetrologyCallRequest;
use App\Http\Services\Machine\MachineServiceInterface;
use App\Http\Services\MetrologyCall\MetrologyCallServiceInterface;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class MetrologyCallController extends Controller
{
    protected MetrologyCallServiceInterface $metrologyCallService;
    protected MachineServiceInterface $machineService;

    public function __construct(MetrologyCallServiceInterface $metrologyCallService, MachineServiceInterface $machineService)
    {
        $this->metrologyCallService = $metrologyCallService;
        $this->machineService = $machineService;
    }

    public function index(): Response 
    {
        return Inertia::render('metrology-calls', [
            'metrologyCalls' => $this->metrologyCallService->getAll(),
            'machines' => $this->machineService->getAll(),
            'operations' => Operation::all()
        ]);
    }

    public function store(UpsertMetrologyCallRequest $request): RedirectResponse 
    {
        $data = $request->validated();
        $data['status'] = 'waiting_receive';
        
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
