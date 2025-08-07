<?php

namespace App\Exports;

use App\Enums\MetrologyCallStatusesEnum;
use App\Enums\MetrologyCallTypesEnum;
use App\Models\MetrologyCall;
use App\Utils\DateUtils;
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
        return [
            'ID', 
            'Nome do item', 
            'Máquina', 
            'Operação', 
            'Tipo', 
            'Status', 
            'Criado por', 
            'Fechado por', 
            'Data de Criação', 
            'Data de Recebimento', 
            'Data de Fechamento'
        ];
    }
    
    public function map($metrologyCall): array
    {
        $STATUS_MAP = [
            MetrologyCallStatusesEnum::APPROVED => 'Aprovado',
            MetrologyCallStatusesEnum::REJECTED => 'Reprovado',
            MetrologyCallStatusesEnum::WAITING_RECEIVE => 'Aguardando Recebimento',
            MetrologyCallStatusesEnum::WAITING_MEASUREMENT => 'Aguardando Medição'
        ];

        $TYPE_MAP = [
            MetrologyCallTypesEnum::SETUP => 'Setup',
            MetrologyCallTypesEnum::PRODUCTION => 'Produção',
            MetrologyCallTypesEnum::ADJUSTMENT => 'Ajuste'
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
            DateUtils::formatDate($metrologyCall->created_at),
            DateUtils::formatDate($metrologyCall->received_at),
            DateUtils::formatDate($metrologyCall->closed_at)
        ];
    }
}
