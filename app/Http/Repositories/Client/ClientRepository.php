<?php

namespace App\Http\Repositories\Client;

use App\Http\Repositories\Client\ClientRepositoryInterface;
use App\Models\Client;
use Illuminate\Database\Eloquent\Collection;

class ClientRepository implements ClientRepositoryInterface
{
    protected Client $model;

    public function __construct(Client $client)
    {
        $this->model = $client;
    }

    public function getAll(): Collection
    {
        return $this->model->all();
    }

    public function getById(int $id): ?Client 
    {
        return $this->model->find($id);
    }

    public function store(array $data): Client
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data): bool
    {
        $client = $this->getById($id);

        if (!$client) {
            return false;
        }

        return $client->update($data);
    }

    public function destroy(int $id): bool
    {
        $client = $this->getById($id);

        if (!$client) {
            return false;
        }

        return $client->delete();
    }

    public function getByCode(string $code): ?Client
    {
        return $this->model->where('code', $code)->first();
    }
}