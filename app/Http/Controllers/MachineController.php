<?php

namespace App\Http\Controllers;

use App\Exports\MachineExport;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Machine;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class MachineController extends Controller
{
    public function index(): Response {
        return Inertia::render('machines', [
            'machines' => Machine::with('operation')->get()
        ]);
    }

    public function export(): BinaryFileResponse {
        return Excel::download(new MachineExport, 'máquinas.xlsx');
    }
}
