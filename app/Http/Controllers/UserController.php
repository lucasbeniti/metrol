<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Requests\UpsertUserRequest;
use App\Http\Services\User\UserServiceInterface;
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
        $this->userService->store($request->validated());
        
        return redirect()->route('users.index');
    }

    public function update($id, UpsertUserRequest $request): RedirectResponse
    {
        $this->userService->update($id, $request->validated());

        return redirect()->route('users.index');
    }

    public function destroy($id): RedirectResponse
    {
        $this->userService->destroy($id);

        return redirect()->route('users.index');
    }

    public function export(): BinaryFileResponse
    {
        return $this->userService->export();
    }
}
