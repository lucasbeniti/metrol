<?php

namespace App\Http\Controllers;

use App\Exports\MachineExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpsertMachineRequest;
use Inertia\Inertia;
use App\Models\Machine;
use App\Models\Operation;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class MachineController extends Controller
{
    public function index(): Response {
        return Inertia::render('machines', [
            'machines' => Machine::with('operation')->get(),
            'operations' => Operation::all()
        ]);
    }

    public function store(UpsertMachineRequest $request): RedirectResponse {
        Machine::create($request->validated());
        
        return redirect()->route('machines.index');
    }

    public function update($id, UpsertMachineRequest $request): RedirectResponse {
        $machine = Machine::findOrFail($id);
        $machine->update($request->validated());

        return redirect()->route('machines.index');
    }

    public function destroy($id): RedirectResponse {
        $machine = Machine::findOrFail($id);
        $machine->delete();

        return redirect()->route('machines.index');
    }

    public function export(): BinaryFileResponse {
        return Excel::download(new MachineExport, 'máquinas.xlsx');
    }
}
