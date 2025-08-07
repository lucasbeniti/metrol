<?php

namespace App\Exports;

use App\Enums\UserRolesEnum;
use App\Models\User;
use App\Utils\DateUtils;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

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
        $USER_TYPE_MAP = [
            UserRolesEnum::ADMIN => 'Administrador',
            UserRolesEnum::METROLOGIST => 'Metrologista',
            UserRolesEnum::OPERATOR => 'Operador'
        ];

        return [
            $user->id,
            $user->name,
            $user->identification,
            $USER_TYPE_MAP[$user->user_role_id] ?? 'Desconhecido',
            DateUtils::formatDate($user->created_at)
        ];
    }
}
