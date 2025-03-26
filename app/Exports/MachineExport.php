<?php

namespace App\Exports;

use App\Models\Machine;
use App\Models\Tool;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Carbon\Carbon;

class MachineExport implements FromCollection, WithMapping, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Machine::all();
        return Tool::all();
    }

    public function headings(): array
    {
        return ['ID', 'Nome', 'Código', 'Operação', 'Ferramenta', 'Data de Criação'];
    }

    public function map($machine): array
    {
        return [
            $machine->id,
            $machine->name,
            $machine->code,
            $machine->operation->name,
            $machine->tool ? $machine->tool->name : 'Não se aplica',
            Carbon::parse($machine->created_at)->format('d/m/Y H:i:s')
        ];
    }
}
