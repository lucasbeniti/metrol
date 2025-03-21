<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Operation;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\OperationExport;
use App\Http\Requests\UpsertOperationRequest;
use App\Models\Item;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class OperationController extends Controller
{
    public function index($itemId): Response {
        return Inertia::render('operations', [
            'operations' => Operation::with(['item'])
                ->where('item_id', $itemId)
                ->get(),
            'item' => Item::findOrFail($itemId),
        ]);
    }

    public function store(UpsertOperationRequest $request): RedirectResponse {
        $data = $request->validated();

        Operation::create($data);
        
        return redirect()->route('items.operations.index', ['item' => $data['item_id']]);
    }

    public function update($itemId, $operationId, UpsertOperationRequest $request): RedirectResponse {
        $operation = Operation::where('item_id', $itemId)->findOrFail($operationId);
        $operation->update($request->validated());

        return redirect()->route('items.operations.index', ['item' => $operation['item_id']]);
    }

    public function destroy($itemId, $operationId): RedirectResponse {
        $operation = Operation::where('item_id', $itemId)->findOrFail($operationId);
        $operation->delete();

        return redirect()->route('items.operations.index', ['item' => $operation['item_id']]);
    }

    public function export(): BinaryFileResponse {
        return Excel::download(new OperationExport, 'chamados.xlsx');
    }
}
