<?php

namespace App\Exports;

use App\Enums\UserType;
use App\Models\User;
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
        return ['ID', 'Nome', 'Identificação', 'Tipo'];
    }

    public function map($user): array
    {
        $USER_TYPE_MAP = [
            'admin' => 'Admin',
            'production' => 'Produção',
            'metrologist' => 'Metrologista'
        ];

        return [
            $user->id,
            $user->name,
            $user->identification,
            $USER_TYPE_MAP[$user->type]
        ];
    }
}
