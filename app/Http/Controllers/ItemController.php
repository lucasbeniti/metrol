<?php

namespace App\Http\Controllers;

use App\Exports\ItemExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpsertItemRequest;
use App\Models\CostCenter;
use App\Models\Item;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ItemController extends Controller
{
    public function index(): Response {
        return Inertia::render('items', [
            'items' => Item::with('costCenter')->get(),
            'costCenters' => CostCenter::all()
        ]);
    }

    public function store(UpsertItemRequest $request): RedirectResponse {
        Item::create($request->validated());
        
        return redirect()->route('items.index');
    }

    public function update($id, UpsertItemRequest $request): RedirectResponse {
        $item = Item::findOrFail($id);
        $item->update($request->validated());

        return redirect()->route('items.index');
    }

    public function destroy($id): RedirectResponse {
        $item = Item::findOrFail($id);
        $item->delete();

        return redirect()->route('items.index');
    }

    public function export(): BinaryFileResponse {
        return Excel::download(new ItemExport, 'items.xlsx');
    }
}
