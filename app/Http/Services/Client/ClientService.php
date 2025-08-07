<?php

namespace App\Http\Services\Client;

use App\Enums\LogActionsEnum;
use App\Enums\LogEntitiesEnum;
use App\Enums\LogTablesEnum;
use App\Http\Repositories\Client\ClientRepositoryInterface;
use App\Models\Client;
use App\Traits\LogsTrait;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Hash;

class ClientService implements ClientServiceInterface
{
    use LogsTrait;

    protected ClientRepositoryInterface $clientRepository;

    public function __construct(ClientRepositoryInterface $clientRepository)
    {
        $this->clientRepository = $clientRepository;
        $this->initializeLogsTrait();
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

        $this->storeLog(
            LogActionsEnum::CREATE,
            LogEntitiesEnum::CLIENTS,
            $client->name,
            LogTablesEnum::CLIENTS,
            $this->getClientLogDetails($client)
        );

        return $client;
    }

    public function update(int $id, array $data): bool
    {
        $clientWithCodeAlreadyExists = $this->clientRepository->getByCode($data['code']);

        if ($clientWithCodeAlreadyExists && $clientWithCodeAlreadyExists->id !== $id) {
            throw new Exception('Já existe um cliente com esse código.');
        }

        $success = $this->clientRepository->update($id, $data);
        
        $client = $this->getById($id);

        if ($success) {
            $this->storeLog(
                LogActionsEnum::UPDATE,
                LogEntitiesEnum::CLIENTS,
                $data['name'],
                LogTablesEnum::CLIENTS,
                $this->getClientLogDetails($client)
            );
        }

        return $success;
    }

    public function destroy(int $id): bool
    {
        $client = $this->clientRepository->getById($id);

        $clientName = $client->name;

        if ($client->costCenters()->count() > 0) {
            throw new Exception('Não é possível excluir um cliente que possui centros de custo associados.');
        }

        $success = $this->clientRepository->destroy($id);

        if ($success) {
            $this->storeLog(
                LogActionsEnum::DELETE,
                LogEntitiesEnum::CLIENTS,
                $clientName,
                LogTablesEnum::CLIENTS
            );
        }

        return $success;
    }

    private function getClientLogDetails(Client $client): array
    {
        return [
            'name' => $client->name,
            'code' => $client->code
        ];
    }
}