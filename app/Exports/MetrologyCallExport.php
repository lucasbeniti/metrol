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
        return ['ID', 'Nome do item', 'Máquina', 'Operação', 'Tipo', 'Status', 'Criado por', 'Fechado por', 'Data de Criação'];
    }
    
    public function map($metrologyCall): array
    {
        $STATUS_MAP = [
            1 => 'Aprovado',
            2 => 'Reprovado',
            3 => 'Aguardando Recebimento',
            4 => 'Aguardando Medição'
        ];

        $TYPE_MAP = [
            1 => 'Setup',
            2 => 'Produção',
            3 => 'Adjustment'
        ];

        return [
            $metrologyCall->id,
            $metrologyCall->operation->item->name ?? 'N/A',
            $metrologyCall->machine->name ?? 'N/A',
            $metrologyCall->operation->name ?? 'N/A',
            $TYPE_MAP[$metrologyCall->metrology_call_type_id] ?? 'Desconhecido',
            $STATUS_MAP[$metrologyCall->metrology_call_status_id] ?? 'Desconhecido',
            $metrologyCall->openedByUser->name ?? 'N/A',
            $metrologyCall->closed_by_user_id ? $metrologyCall->closedByUser->name : 'N/A',
            Carbon::parse($metrologyCall->created_at)->format('d/m/Y H:i:s')
        ];
    }
}
