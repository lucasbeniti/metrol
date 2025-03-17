<?php

namespace App\Exports;

use App\Models\CostCenter;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

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
        return ['ID', 'Nome', 'Código', 'Cliente'];
    }

    public function map($costCenter): array
    {
        return [
            $costCenter->id,
            $costCenter->name,
            $costCenter->code,
            $costCenter->client->name
        ];  
    }
}
