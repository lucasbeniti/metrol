<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Machine;
use App\Models\MetrologyCall;
use App\Models\Operation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Exception;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\MetrologyCallExport;
use Illuminate\Validation\ValidationException;

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
            $errors = $validator->errors()->toArray();
            foreach ($errors as $field => $messages) {
                $errors[$field] = 'Este campo é obrigatório.';
            }
            throw ValidationException::withMessages($errors);
        }

        try {
            $request['status'] = 'waiting_receive';
            MetrologyCall::create($request->all());
            
            return redirect()->route('metrology-calls.index');
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao criar o chamado de metrologia.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update($id, Request $request) {
        $validator = Validator::make($request->all(), [
            'item_name' => 'required|string|max:255',
            'machine_id' => 'required|exists:machines,id',
            'operation_id' => 'required|exists:operations,id',
            'type' => 'required|in:setup,production,adjust'
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors()->toArray();
            foreach ($errors as $field => $messages) {
                $errors[$field] = 'Este campo é obrigatório.';
            }
            throw ValidationException::withMessages($errors);
        }

        try{
            $metrologyCall = MetrologyCall::find($id);
            $metrologyCall->update($request->all());
            
            return redirect()->route('metrology-calls.index');
        }catch(Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao atualizar o chamado de metrologia.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id) {
        try{
            $metrologyCall = MetrologyCall::find($id);
            $metrologyCall->delete();
            
            return redirect()->route('metrology-calls.index');
        }catch(Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao deletar o chamado de metrologia.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function export() {
        return Excel::download(new MetrologyCallExport, 'chamados.xlsx');
    }
}
