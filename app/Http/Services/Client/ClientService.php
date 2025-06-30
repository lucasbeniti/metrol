<?php

namespace App\Http\Services\Client;

use App\Http\Repositories\Client\ClientRepositoryInterface;
use App\Models\Client;
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
        $data['password'] = Hash::make('123');

        return $this->clientRepository->store($data);
    }

    public function update(int $id, array $data): bool
    {
        return $this->clientRepository->update($id, $data);
    }

    public function destroy(int $id): bool
    {
        return $this->clientRepository->destroy($id);
    }
}