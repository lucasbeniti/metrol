<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Machine;
use App\Models\MetrologyCall;
use App\Models\Operation;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\MetrologyCallExport;
use App\Http\Requests\UpsertMetrologyCallRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class MetrologyCallController extends Controller
{
    public function index(): Response {
        return Inertia::render('metrology-calls', [
            'metrologyCalls' => MetrologyCall::with(['machine', 'operation'])->get(),
            'machines' => Machine::all(),
            'operations' => Operation::all()
        ]);
    }

    public function store(UpsertMetrologyCallRequest $request): RedirectResponse {
        $data = $request->validated();
        $data['status'] = 'waiting_receive';
        
        MetrologyCall::create($data);
        
        return redirect()->route('metrology-calls.index');
    }

    public function update($id, UpsertMetrologyCallRequest $request): RedirectResponse {
        $metrologyCall = MetrologyCall::findOrFail($id);
        $metrologyCall->update($request->validated());

        return redirect()->route('metrology-calls.index');
    }

    public function destroy($id): RedirectResponse {
        $metrologyCall = MetrologyCall::findOrFail($id);
        $metrologyCall->delete();

        return redirect()->route('metrology-calls.index');
    }

    public function export(): BinaryFileResponse {
        return Excel::download(new MetrologyCallExport, 'chamados.xlsx');
    }
}
