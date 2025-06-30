<?php

namespace App\Http\Services\User;

use App\Http\Repositories\User\UserRepositoryInterface;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class UserService implements UserServiceInterface
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
        $userWithIdentificationAlreadyExists = $this->userRepository->getByIdentification($data['identification']);

        if ($userWithIdentificationAlreadyExists) {
            throw new Exception('Já existe um usuário com essa identificação.');
        }

        $data['password'] = Hash::make('123');

        return $this->userRepository->store($data);
    }

    public function update(int $id, array $data): bool
    {
        $userWithIdentificationAlreadyExists = $this->userRepository->getByIdentification($data['identification']);

        if ($userWithIdentificationAlreadyExists && $userWithIdentificationAlreadyExists->id !== $id) {
            throw new Exception('Já existe um usuário com essa identificação.');
        }

        return $this->userRepository->update($id, $data);
    }

    public function destroy(int $id): bool
    {
        $user = $this->userRepository->getById($id);

        $hasMetrologyCalls = false;

        if ($user->userRole->name === 'Metrologista' || $user->userRole->name === 'Operador') {
            $hasMetrologyCalls = $user->openedMetrologyCalls()->count() > 0 || $user->closedMetrologyCalls()->count() > 0;
        }

        if ($user->logs()->count() > 0 || $hasMetrologyCalls) {
            throw new Exception('Não é possível excluir um usuário que possui registros de logs ou chamados de metrologia.');
        }
        
        return $this->userRepository->destroy($id);
    }

    public function export(): BinaryFileResponse
    {
        return $this->userRepository->export();
    }
}