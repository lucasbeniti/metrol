<?php

namespace App\Http\Services\Client;

use App\Http\Repositories\Client\ClientRepositoryInterface;
use App\Models\Client;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Hash;

class ClientService implements ClientServiceInterface
{
    protected ClientRepositoryInterface $clientRepository;

    public function __construct(ClientRepositoryInterface $clientRepository)
    {
        $this->clientRepository = $clientRepository;
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

        return $this->clientRepository->store($data);
    }

    public function update(int $id, array $data): bool
    {
        $clientWithCodeAlreadyExists = $this->clientRepository->getByCode($data['code']);

        if ($clientWithCodeAlreadyExists && $clientWithCodeAlreadyExists->id !== $id) {
            throw new Exception('Já existe um cliente com esse código.');
        }

        return $this->clientRepository->update($id, $data);
    }

    public function destroy(int $id): bool
    {
        $client = $this->clientRepository->getById($id);

        if ($client->costCenters()->count() > 0) {
            throw new Exception('Não é possível excluir um cliente que possui centros de custo associados.');
        }

        return $this->clientRepository->destroy($id);
    }
}