<?php

namespace App\Http\Services;

use App\Http\Repositories\User\UserRepositoryInterface;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class UserService
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getAll(): Collection
    {
        return $this->userRepository->getAll();
    }

    public function getById(int $id): ?User
    {
        return $this->userRepository->getById($id);
    }

    public function store(array $data): User
    {
        $data['password'] = Hash::make('123');

        return $this->userRepository->store($data);
    }

    public function update(int $id, array $data): bool
    {
        return $this->userRepository->update($id, $data);
    }

    public function destroy(int $id): bool
    {
        return $this->userRepository->destroy($id);
    }

    public function export(): BinaryFileResponse
    {
        return $this->userRepository->export();
    }
}