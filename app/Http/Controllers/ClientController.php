<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertClientRequest;
use Inertia\Inertia;
use App\Http\Services\Client\ClientServiceInterface;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class ClientController extends Controller
{
    protected ClientServiceInterface $clientService;

    public function __construct(ClientServiceInterface $clientService)
    {
        $this->clientService = $clientService;
    }

    public function index(): Response
    {
        return Inertia::render('clients', [
            'clients' => $this->clientService->getAll()
        ]);
    }

    public function store(UpsertClientRequest $request): RedirectResponse
    {
        $this->clientService->store($request->validated());
        
        return redirect()->route('clients.index');
    }

    public function update($id, UpsertClientRequest $request): RedirectResponse
    {
        $this->clientService->update($id, $request->validated());

        return redirect()->route('clients.index');
    }

    public function destroy($id): RedirectResponse
    {
        $this->clientService->destroy($id);

        return redirect()->route('clients.index');
    }
}
