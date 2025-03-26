<?php

namespace App\Exports;

use App\Models\Tool;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Carbon\Carbon;

class ToolExport implements FromCollection, WithMapping, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Tool::all();
    }

    public function headings(): array
    {
        return ['ID', 'Nome', 'Código', 'Data de Criação'];
    }

    public function map($tool): array
    {
        return [
            $tool->id,
            $tool->name,
            $tool->code,
            Carbon::parse($tool->created_at)->format('d/m/Y H:i:s')
        ];
    }
}
