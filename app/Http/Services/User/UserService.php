<?php

namespace App\Http\Services\User;

use App\Enums\LogActionsEnum;
use App\Enums\LogEntitiesEnum;
use App\Enums\LogTablesEnum;
use App\Enums\UserRolesEnum;
use App\Exceptions\UserAlreadyExistsException;
use App\Exceptions\UserCannotBeDeletedException;
use App\Http\Repositories\User\UserRepositoryInterface;
use App\Models\User;
use App\Traits\LogsTrait;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class UserService implements UserServiceInterface
{
    use LogsTrait;

    public function __construct(
        private UserRepositoryInterface $userRepository
    ) {
        $this->initializeLogsTrait();
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
        if ($this->userRepository->getByIdentification($data['identification'])) {
            throw new UserAlreadyExistsException();
        }

        $data['password'] = Hash::make('123');

        $user = $this->userRepository->store($data);

        $this->storeLog(
            LogActionsEnum::CREATE,
            LogEntitiesEnum::USERS,
            $user->name,
            LogTablesEnum::USERS,
            $this->getUserLogDetails($user)
        );

        return $user;
    }

    public function update(int $id, array $data): bool
    {
        $existingUser = $this->userRepository->getByIdentification($data['identification']);
        if ($existingUser && $existingUser->id !== $id) {
            throw new UserAlreadyExistsException();
        }

        $success = $this->userRepository->update($id, $data);
        if ($success) {
            $user = $this->getById($id);
            $this->storeLog(
                LogActionsEnum::UPDATE,
                LogEntitiesEnum::USERS,
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

        if (!$user) {
            return false;
        }

        $userName = $user->name;

        $hasMetrologyCalls = false;

        if (in_array($user->user_role_id, [UserRolesEnum::METROLOGIST, UserRolesEnum::OPERATOR], true)) {
            $hasMetrologyCalls = $user->openedMetrologyCalls()->count() > 0 || $user->closedMetrologyCalls()->count() > 0;
        }

        if ($user->logs()->count() > 0 || $hasMetrologyCalls) {
            throw new UserCannotBeDeletedException();
        }

        $success = $this->userRepository->destroy($id);

        if ($success) {
            $this->storeLog(
                LogActionsEnum::DELETE,
                LogEntitiesEnum::USERS,
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
