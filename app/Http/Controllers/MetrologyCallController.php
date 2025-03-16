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
        return Inertia::render('metrology-calls', [
            'metrologyCalls' => MetrologyCall::with(['machine', 'operation'])->get(),
            'machines' => Machine::all(),
            'operations' => Operation::all()
        ]);
    }

    public function store(Request $request) {
        $validator = $this->validateRequest($request);

        if ($validator->fails()) {
            $errors = $this->customizeValidationErrors($validator);
            throw ValidationException::withMessages($errors);
        }

        $request['status'] = 'waiting_receive';
        MetrologyCall::create($request->all());
        
        return redirect()->route('metrology-calls.index');
    }

    public function update($id, Request $request) {
        $validator = $this->validateRequest($request);

       if ($validator->fails()) {
            $errors = $this->customizeValidationErrors($validator);
            throw ValidationException::withMessages($errors);
        }

        $metrologyCall = MetrologyCall::findOrFail($id);
        $metrologyCall->update($request->all());

        return redirect()->route('metrology-calls.index');
    }

    public function destroy($id) {
        $metrologyCall = MetrologyCall::findOrFail($id);
        $metrologyCall->delete();

        return redirect()->route('metrology-calls.index');
    }

    public function export() {
        return Excel::download(new MetrologyCallExport, 'chamados.xlsx');
    }

    protected function validateRequest(Request $request) {
        return Validator::make($request->all(), [
          'item_name' => 'required|string|max:255',
          'machine_id' => 'required|exists:machines,id',
          'operation_id' => 'required|exists:operations,id',
          'type' => 'required|in:setup,production,adjust'
        ]);
    }

    protected function customizeValidationErrors($validator) {
        $errors = $validator->errors()->toArray();
        foreach ($errors as $field => $messages) {
            $errors[$field] = 'Este campo é obrigatório.';
        }
        return $errors;
    }
}
