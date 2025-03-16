<?php

namespace App\Http\Controllers;

use App\Exports\MachineExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\CostCenter\UpsertCostCenterRequest;
use App\Models\CostCenter;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class CostCenterController extends Controller
{
    public function index(): Response {
        return Inertia::render('cost-centers', [
            'costCenters' => CostCenter::with('client')->get()
        ]);
    }

    public function store(UpsertCostCenterRequest $request): RedirectResponse {
        CostCenter::create($request->validated());
        
        return redirect()->route('cost-centers.index');
    }

    public function update($id, UpsertCostCenterRequest $request): RedirectResponse {
        $costCenter = CostCenter::findOrFail($id);
        $costCenter->update($request->validated());

        return redirect()->route('cost-centers.index');
    }

    public function destroy($id): RedirectResponse {
        $costCenter = CostCenter::findOrFail($id);
        $costCenter->delete();

        return redirect()->route('cost-centers.index');
    }

    public function export(): BinaryFileResponse {
        return Excel::download(new MachineExport, 'centros_de_custo.xlsx');
    }
}
