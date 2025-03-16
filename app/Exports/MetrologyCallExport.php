<?php

namespace App\Exports;

use App\Models\MetrologyCall;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Carbon\Carbon;

class MetrologyCallExport implements FromCollection, WithHeadings, WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return MetrologyCall::all();
    }

    public function headings(): array
    {
        return ['ID', 'Nome do item', 'Máquina', 'Operação', 'Tipo', 'Status', 'Data de Criação'];
    }
    
    public function map($metrologyCall): array
    {
        $STATUS_MAP = [
            'ok' => 'Ok',
            'nok' => 'Não ok',
            'waiting_receive' => 'Aguardando Recebimento',
            'waiting_measurement' => 'Aguardando Medição'
        ];

        $TYPE_MAP = [
            'setup' => 'Setup',
            'adjust' => 'Ajuste',
            'production' => 'Produção'
        ];

        return [
            $metrologyCall->id,
            $metrologyCall->item_name,
            $metrologyCall->machine->name,
            $metrologyCall->operation->name,
            $TYPE_MAP[$metrologyCall->type],
            $STATUS_MAP[$metrologyCall->status],
            Carbon::parse($metrologyCall->created_at)->timezone('America/Sao_Paulo')->format('d/m/Y H:i:s')
        ];
    }
}
