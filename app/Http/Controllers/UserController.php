<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Requests\UpsertUserRequest;
use App\Http\Services\User\UserServiceInterface;
use Exception;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class UserController extends Controller
{
    protected UserServiceInterface $userService;

    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function index(): Response
    {
        return Inertia::render('users', [
            'users' => $this->userService->getAll()
        ]);
    }

    public function store(UpsertUserRequest $request): RedirectResponse
    {
        try {
            $this->userService->store($request->validated());
        
            return redirect()->route('users.index');    
        } catch (Exception $e) {
            if ($e->getMessage() === 'Já existe um usuário com essa identificação.') {
                return redirect()->back()->withErrors(['error' => $e->getMessage()])->withInput();
            }

            return redirect()->back()->withErrors(['error' => 'Erro interno do servidor. Tente novamente mais tarde.'])->withInput();
        }
    }

    public function update($id, UpsertUserRequest $request): RedirectResponse
    {
        try {
            $this->userService->update($id, $request->validated());

            return redirect()->route('users.index');
        } catch (Exception $e) {
            if ($e->getMessage() === 'Já existe um usuário com essa identificação.') {
                return redirect()->back()->withErrors(['error' => $e->getMessage()])->withInput();
            }

            return redirect()->back()->withErrors(['error' => 'Erro interno do servidor. Tente novamente mais tarde.'])->withInput();
        }
    }

    public function destroy($id): RedirectResponse
    {
        try {
            $this->userService->destroy($id);

            return redirect()->route('users.index');
        } catch (Exception $e) {
            if ($e->getMessage() === 'Não é possível excluir um usuário que possui registros de logs ou chamadas de metrologia.') {
                return redirect()->back()->withErrors(['error' => $e->getMessage()])->withInput();
            }

            return redirect()->back()->withErrors(['error' => 'Erro interno do servidor. Tente novamente mais tarde.']);
        }
    }

    public function export(): BinaryFileResponse
    {
        return $this->userService->export();
    }
}
