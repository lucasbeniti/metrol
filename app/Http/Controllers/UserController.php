<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\UserExport;
use App\Http\Requests\UpsertUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class UserController extends Controller
{
    public function index(): Response {
        return Inertia::render('users', [
            'users' => User::all()
        ]);
    }

    public function store(UpsertUserRequest $request): RedirectResponse {
        $data = $request->validated();
        $data['password'] = Hash::make('123');
        
        User::create($data);
        
        return redirect()->route('users.index');
    }

    public function update($id, UpsertUserRequest $request): RedirectResponse {
        $user = User::findOrFail($id);
        $user->update($request->validated());

        return redirect()->route('users.index');
    }

    public function destroy($id): RedirectResponse {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->route('users.index');
    }

    public function export(): BinaryFileResponse {
        return Excel::download(new UserExport, 'usuários.xlsx');
    }
}
