<?php

namespace App\Http\Controllers;

use App\Exports\ToolExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpsertToolRequest;
use Inertia\Inertia;
use App\Models\Tool;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ToolController extends Controller
{
    public function index(): Response {
        return Inertia::render('tools', [
            'tools' => Tool::get()
        ]);
    }

    public function store(UpsertToolRequest $request): RedirectResponse {
        Tool::create($request->validated());
        
        return redirect()->route('tools.index');
    }

    public function update($id, UpsertToolRequest $request): RedirectResponse {
        $tool = Tool::findOrFail($id);
        $tool->update($request->validated());

        return redirect()->route('tools.index');
    }

    public function destroy($id): RedirectResponse {
        $tool = Tool::findOrFail($id);
        $tool->delete();

        return redirect()->route('tools.index');
    }

    public function export(): BinaryFileResponse {
        return Excel::download(new ToolExport, 'ferramentas.xlsx');
    }
}
