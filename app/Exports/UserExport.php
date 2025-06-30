<?php

namespace App\Exports;

use App\Enums\UserType;
use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Carbon\Carbon;

class UserExport implements FromCollection, WithMapping, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return User::all();
    }

    public function headings(): array
    {
        return ['ID', 'Nome', 'Identificação', 'Tipo', 'Data de Criação'];
    }

    public function map($user): array
    {
        $user_type_map = [
            'admin' => 'Administrador',
            'operator' => 'Operador',
            'metrologist' => 'Metrologista'
        ];

        return [
            $user->id,
            $user->name,
            $user->identification,
            $user_type_map[$user->userRole->name] ?? 'Desconhecido',
            Carbon::parse($user->created_at)->format('d/m/Y H:i:s')
        ];
    }
}
