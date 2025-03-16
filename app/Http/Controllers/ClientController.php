<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use App\Models\Client;

class ClientController extends Controller
{
    public function index() {
        $ClientsList = Client::get();
        return Inertia::render('clients', [
            'ClientsList' => $ClientsList,
        ]);
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
          'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors()->toArray();
            foreach ($errors as $field => $messages) {
                $errors[$field] = 'Este campo é obrigatório.';
            }
            throw ValidationException::withMessages($errors);
        }

        try {
            Client::create($request->all());
            
            return redirect()->route('clients.index');
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao criar o cliente.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update($id, Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors()->toArray();
            foreach ($errors as $field => $messages) {
                $errors[$field] = 'Este campo é obrigatório.';
            }
            throw ValidationException::withMessages($errors);
        }

        try{
            $client = Client::find($id);
            $client->update($request->all());
            
            return redirect()->route('clients.index');
        }catch(Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao atualizar o cliente.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id) {
        try{
            $client = Client::find($id);
            $client->delete();
            
            return redirect()->route('clients.index');
        }catch(Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao deletar o cliente.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

}
