<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Operation;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\OperationExport;
use App\Http\Requests\UpsertOperationRequest;
use App\Models\CostCenter;
use App\Models\Item;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class OperationController extends Controller
{
    public function index(): Response {
        return Inertia::render('operations', [
            'operations' => Operation::with(['costCenter', 'item'])->get(),
            'costCenters' => CostCenter::all(),
            'items' => Item::all()
        ]);
    }

    public function store(UpsertOperationRequest $request): RedirectResponse {
        $data = $request->validated();

        Operation::create($data);
        
        return redirect()->route('operations.index');
    }

    public function update($id, UpsertOperationRequest $request): RedirectResponse {
        $operation = Operation::findOrFail($id);
        $operation->update($request->validated());

        return redirect()->route('operations.index');
    }

    public function destroy($id): RedirectResponse {
        $operation = Operation::findOrFail($id);
        $operation->delete();

        return redirect()->route('operations.index');
    }

    public function export(): BinaryFileResponse {
        return Excel::download(new OperationExport, 'chamados.xlsx');
    }
}
