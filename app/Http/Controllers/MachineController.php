<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpsertMachineRequest;
use App\Http\Services\Machine\MachineServiceInterface;
use Inertia\Inertia;
use App\Models\Machine;
use App\Models\Tool;
use App\Models\Operation;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class MachineController extends Controller
{
    protected MachineServiceInterface $machineService;

    public function __construct(MachineServiceInterface $machineService)
    {
        $this->machineService = $machineService;
    }

    public function index(): Response {
        return Inertia::render('machines', [
            'machines' => $this->machineService->getAll(),
            'operations' => Operation::all(),
            'tools' => Tool::all()
        ]);
    }

    public function store(UpsertMachineRequest $request): RedirectResponse
    {
        $this->machineService->store($request->validated());
        
        return redirect()->route('machines.index');
    }

    public function update($id, UpsertMachineRequest $request): RedirectResponse 
    {
        $this->machineService->update($id, $request->validated());

        return redirect()->route('machines.index');
    }

    public function destroy($id): RedirectResponse 
    {
        $this->machineService->destroy($id);

        return redirect()->route('machines.index');
    }

    public function export(): BinaryFileResponse 
    {
        return $this->machineService->export();
    }
}
