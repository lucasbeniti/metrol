<?php

namespace App\Exports;

use App\Models\Machine;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class MachineExport implements FromCollection, WithMapping, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Machine::all();
    }

    public function headings(): array
    {
        return ['ID', 'Nome', 'Código', 'Operação'];
    }

    public function map($machine): array
    {
        return [
            $machine->id,
            $machine->name,
            $machine->code,
            $machine->operation->name
        ];
    }
}
