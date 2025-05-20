<?php

namespace App\Http\Repositories\User;

use App\Exports\UserExport;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class UserRepository implements UserRepositoryInterface
{
    protected User $model;

    public function __construct(User $user)
    {
        $this->model = $user;
    }

    public function getAll(): Collection
    {
        return $this->model->all();
    }

    public function getById(int $id): ?User 
    {
        return $this->model->find($id);
    }

    public function store(array $data): User
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data): bool
    {
        $user = $this->getById($id);

        if (!$user) {
            return false;
        }

        return $user->update($data);
    }

    public function destroy(int $id): bool
    {
        $user = $this->getById($id);

        if (!$user) {
            return false;
        }

        return $user->delete();
    }

    public function export(): BinaryFileResponse
    {
        return Excel::download(new UserExport, 'usuários.xlsx');
    }
}