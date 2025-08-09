<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertClientRequest;
use Inertia\Inertia;
use App\Http\Services\Client\ClientServiceInterface;
use Exception;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class ClientController extends Controller
{
    public function __construct(
        private ClientServiceInterface $clientService
    ) {}

    public function index(): Response
    {
        return Inertia::render('clients', [
            'clients' => $this->clientService->getAll()
        ]);
    }

    public function store(UpsertClientRequest $request): RedirectResponse
    {
        try {
            $this->clientService->store($request->validated());
        
            return redirect()->route('clients.index');
        } catch (Exception $e) {
            if ($e->getMessage() === 'Já existe um cliente com esse código.') {
                return redirect()->back()->withErrors(['error' => $e->getMessage()])->withInput();
            }

            return redirect()->back()->withErrors(['error' => 'Erro interno do servidor. Tente novamente mais tarde.'])->withInput();
        }
    }

    public function update($id, UpsertClientRequest $request): RedirectResponse
    {
        try {
            $this->clientService->update($id, $request->validated());
        
            return redirect()->route('clients.index');
        } catch (Exception $e) {
            if ($e->getMessage() === 'Já existe um cliente com esse código.') {
                return redirect()->back()->withErrors(['error' => $e->getMessage()])->withInput();
            }

            return redirect()->back()->withErrors(['error' => 'Erro interno do servidor. Tente novamente mais tarde.'])->withInput();
        }
    }

    public function destroy($id): RedirectResponse
    {
        try {
            $this->clientService->destroy($id);

            return redirect()->route('clients.index');
        } catch (Exception $e) {
            if ($e->getMessage() === 'Não é possível excluir um cliente que possui centros de custo associados.') {
                return redirect()->back()->withErrors(['error' => $e->getMessage()])->withInput();
            }

            return redirect()->back()->withErrors(['error' => 'Erro interno do servidor. Tente novamente mais tarde.'])->withInput();
        }
    }
}
