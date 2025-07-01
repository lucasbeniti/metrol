<?php

namespace App\Http\Services\Client;

use App\Enums\LogActionsEnum;
use App\Enums\LogTablesEnum;
use App\Http\Repositories\Client\ClientRepositoryInterface;
use App\Http\Services\Log\LogServiceInterface;
use App\Models\Client;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ClientService implements ClientServiceInterface
{
    protected ClientRepositoryInterface $clientRepository;
    protected LogServiceInterface $logService;

    public function __construct(ClientRepositoryInterface $clientRepository, LogServiceInterface $logService)
    {
        $this->clientRepository = $clientRepository;
        $this->logService = $logService;
    }

    public function getAll(): Collection
    {
        return $this->clientRepository->getAll();
    }

    public function getById(int $id): ?Client
    {
        return $this->clientRepository->getById($id);
    }

    public function store(array $data): Client
    {
        $clientWithCodeAlreadyExists = $this->clientRepository->getByCode($data['code']);

        if ($clientWithCodeAlreadyExists) {
            throw new Exception('Já existe um cliente com esse código.');
        }

        $data['password'] = Hash::make('123');

        $client = $this->clientRepository->store($data);

        $authenticatedUser = Auth::user();

        $this->logService->store([
            'user_id' => $authenticatedUser->id,
            'action_id' => LogActionsEnum::CREATE,
            'description' => 'O usuário ' . $authenticatedUser->name . ' criou o cliente: ' . $client->name,
            'table_id' => LogTablesEnum::CLIENTS,
        ]);

        return $client;
    }

    public function update(int $id, array $data): bool
    {
        $clientWithCodeAlreadyExists = $this->clientRepository->getByCode($data['code']);

        if ($clientWithCodeAlreadyExists && $clientWithCodeAlreadyExists->id !== $id) {
            throw new Exception('Já existe um cliente com esse código.');
        }

        $success = $this->clientRepository->update($id, $data);

        if ($success) {
            $authenticatedUser = Auth::user();

            $this->logService->store([
                'user_id' => $authenticatedUser->id,
                'action_id' => LogActionsEnum::UPDATE,
                'description' => 'O usuário ' . $authenticatedUser->name . ' atualizou o cliente: ' . $data['name'],
                'table_id' => LogTablesEnum::CLIENTS,
            ]);
        }

        return $success;
    }

    public function destroy(int $id): bool
    {
        $client = $this->clientRepository->getById($id);

        if ($client->costCenters()->count() > 0) {
            throw new Exception('Não é possível excluir um cliente que possui centros de custo associados.');
        }

        $success = $this->clientRepository->destroy($id);

        if ($success) {
            $authenticatedUser = Auth::user();

            $this->logService->store([
                'user_id' => $authenticatedUser->id,
                'action_id' => LogActionsEnum::DELETE,
                'description' => 'O usuário ' . $authenticatedUser->name . ' deletou o cliente: ' . $client->name,
                'table_id' => LogTablesEnum::CLIENTS,
            ]);
        }

        return $success;
    }
}