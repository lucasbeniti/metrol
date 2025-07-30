<?php

namespace App\Http\Services\User;

use App\Enums\LogActionsEnum;
use App\Enums\LogTablesEnum;
use App\Http\Repositories\User\UserRepositoryInterface;
use App\Http\Services\Log\LogServiceInterface;
use App\Models\User;
use App\Traits\LogsTrait;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class UserService implements UserServiceInterface
{
    use LogsTrait;

    protected UserRepositoryInterface $userRepository;
    protected LogServiceInterface $logService;

    public function __construct(UserRepositoryInterface $userRepository, LogServiceInterface $logService)
    {
        $this->userRepository = $userRepository;
        $this->logService = $logService;
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

        $user = $this->userRepository->store($data);

        $this->storeLog(
            $this->logService,
            LogActionsEnum::CREATE,
            'usuário',
            $user->name,
            LogTablesEnum::USERS,
            $this->getUserLogDetails($user)
        );

        return $user;
    }

    public function update(int $id, array $data): bool
    {
        $userWithIdentificationAlreadyExists = $this->userRepository->getByIdentification($data['identification']);

        if ($userWithIdentificationAlreadyExists && $userWithIdentificationAlreadyExists->id !== $id) {
            throw new Exception('Já existe um usuário com essa identificação.');
        }

        $success = $this->userRepository->update($id, $data);

        $user = $this->getById($id);

        if ($success) {
            $this->storeLog(
                $this->logService,
                LogActionsEnum::UPDATE,
                'usuário',
                $data['name'],
                LogTablesEnum::USERS,
                $this->getUserLogDetails($user)
            );
        }

        return $success;
    }

    public function destroy(int $id): bool
    {
        $user = $this->userRepository->getById($id);

        $userName = $user->name;

        $hasMetrologyCalls = false;

        if ($user->userRole->name === 'Metrologista' || $user->userRole->name === 'Operador') {
            $hasMetrologyCalls = $user->openedMetrologyCalls()->count() > 0 || $user->closedMetrologyCalls()->count() > 0;
        }

        if ($user->logs()->count() > 0 || $hasMetrologyCalls) {
            throw new Exception('Não é possível excluir um usuário que possui registros de logs ou chamados de metrologia.');
        }
        
        $success = $this->userRepository->destroy($id);

        if ($success) {
            $this->storeLog(
                $this->logService,
                LogActionsEnum::DELETE,
                'usuário',
                $userName,
                LogTablesEnum::USERS
            );
        }

        return $success;
    }

    public function export(): BinaryFileResponse
    {
        return $this->userRepository->export();
    }

    private function getUserLogDetails(User $user): array
    {
        return [
            'name' => $user->name,
            'identification' => $user->identification,
            'user_role' => $user->userRole->name
        ];
    }
}