<?php

namespace App\Http\Controllers;

use App\Http\Requests\Client\UpsertClientRequest;
use Inertia\Inertia;
use App\Models\Client;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class ClientController extends Controller
{
    public function index(): Response {
        return Inertia::render('clients', [
            'clients' => Client::all()
        ]);
    }

    public function store(UpsertClientRequest $request): RedirectResponse {
        Client::create($request->all());
        
        return redirect()->route('clients.index');
    }

    public function update($id, UpsertClientRequest $request): RedirectResponse {
        $client = Client::findOrFail($id);
        $client->update($request->validated());

        return redirect()->route('clients.index');
    }

    public function destroy($id): RedirectResponse {
        $client = Client::findOrFail($id);
        $client->delete();
        
        return redirect()->route('clients.index');
    }
}
