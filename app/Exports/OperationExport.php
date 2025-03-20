<?php

namespace App\Exports;

use App\Models\Operation;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Carbon\Carbon;

class OperationExport implements FromCollection, WithMapping, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Operation::all();
    }

    public function headings(): array
    {
        return ['ID', 'Nome', 'Código', 'Item', 'Centro de custo', 'Data de Criação'];
    }

    public function map($operation): array
    {
        return [
            $operation->id,
            $operation->name,
            $operation->code,
            $operation->item->name,
            $operation->costCenter->name,
            Carbon::parse($operation->created_at)->timezone('America/Sao_Paulo')->format('d/m/Y H:i:s')
        ];
    }
}
