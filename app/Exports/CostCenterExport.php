<?php

namespace App\Exports;

use App\Models\CostCenter;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Carbon\Carbon;

class CostCenterExport implements FromCollection, WithMapping, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return CostCenter::all();
    }

    public function headings(): array
    {
        return ['ID', 'Nome', 'Código', 'Cliente', 'Data de Criação'];
    }

    public function map($costCenter): array
    {
        return [
            $costCenter->id,
            $costCenter->name,
            $costCenter->code,
            $costCenter->client->name,
            Carbon::parse($costCenter->created_at)->timezone('America/Sao_Paulo')->format('d/m/Y H:i:s')
        ];  
    }
}
