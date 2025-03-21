<?php

namespace App\Exports;

use App\Models\Item;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Carbon\Carbon;

class ItemExport implements FromCollection, WithMapping, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Item::all();
    }

    public function headings(): array
    {
        return ['ID', 'Nome', 'Código', 'Centro de Custo', 'Data de Criação'];
    }

    public function map($item): array
    {
        return [
            $item->id,
            $item->name,
            $item->code,
            $item->costCenter->name,
            Carbon::parse($item->created_at)->format('d/m/Y H:i:s')
        ];
    }
}
