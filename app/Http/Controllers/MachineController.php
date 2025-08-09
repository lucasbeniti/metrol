<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertMachineRequest;
use App\Http\Services\Machine\MachineServiceInterface;
use Inertia\Inertia;
use App\Models\Operation;
use Exception;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class MachineController extends Controller
{
    public function __construct(
        private MachineServiceInterface $machineService
    ) {}

    public function index(): Response {
        return Inertia::render('machines', [
            'machines' => $this->machineService->getAll(),
            'operations' => Operation::all()
        ]);
    }

    public function store(UpsertMachineRequest $request): RedirectResponse
    {
        try {
            $this->machineService->store($request->validated());

            return redirect()->route('machines.index');
        } catch (Exception $e) {
            if ($e->getMessage() === 'Já existe uma máquina com esse código.') {
                return redirect()->back()->withErrors(['error' => $e->getMessage()])->withInput();
            }

            return redirect()->back()->withErrors(['error' => 'Erro interno do servidor. Tente novamente mais tarde.'])->withInput();
        }
    }

    public function update($id, UpsertMachineRequest $request): RedirectResponse 
    {
        try {
            $this->machineService->update($id, $request->validated());

            return redirect()->route('machines.index');
        } catch (Exception $e) {
            if ($e->getMessage() === 'Já existe uma máquina com esse código.') {
                return redirect()->back()->withErrors(['error' => $e->getMessage()])->withInput();
            }

            return redirect()->back()->withErrors(['error' => 'Erro interno do servidor. Tente novamente mais tarde.'])->withInput();
        }
    }

    public function destroy($id): RedirectResponse 
    {
        try {
            $this->machineService->destroy($id);

            return redirect()->route('machines.index');
        } catch (Exception $e) {
            if ($e->getMessage() === 'Não é possível excluir uma máquina que possui chamados de metrologia associadas.') {
                return redirect()->back()->withErrors(['error' => $e->getMessage()])->withInput();
            }

            return redirect()->back()->withErrors(['error' => 'Erro interno do servidor. Tente novamente mais tarde.'])->withInput();
        }
    }
}
