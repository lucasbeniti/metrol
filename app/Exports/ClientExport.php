<?php

namespace App\Exports;

use App\Models\Client;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Carbon\Carbon;

class ClientExport implements FromCollection, WithMapping, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Client::all();
    }

    public function headings(): array
    {
        return ['ID', 'Nome', 'Data de criação'];
    }

    public function map($client): array
    {
        return [
            $client->id,
            $client->name,
            Carbon::parse($client->created_at)->setTimezone('America/Sao_Paulo')->format('d/m/Y H:i:s'),
        ];
    }
}
