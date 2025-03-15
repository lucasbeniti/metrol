<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Machine;
use App\Models\MetrologyCall;
use App\Models\Operation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class MetrologyCallController extends Controller
{
    public function index() {
        $metrologyCalls = MetrologyCall::with(['machine', 'operation'])->get();
        $machines = Machine::all();
        $operations = Operation::all();

        return Inertia::render('metrology-calls', [
            'metrologyCalls' => $metrologyCalls,
            'machines' => $machines,
            'operations' => $operations
        ]);
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'item_name' => 'required|string|max:255',
            'machine_id' => 'required|exists:machines,id',
            'operation_id' => 'required|exists:operations,id',
            'type' => 'required|in:setup,production,adjust'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $request['status'] = 'waiting_receive';
            MetrologyCall::create($request->all());

            $metrologyCalls = MetrologyCall::with(['machine', 'operation'])->get();
            $machines = Machine::all();
            $operations = Operation::all();
            
            return Inertia::render('metrology-calls', [
                'metrologyCalls' => $metrologyCalls,
                'machines' => $machines,
                'operations' => $operations
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao criar o chamado de metrologia.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
