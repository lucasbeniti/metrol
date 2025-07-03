<?php

namespace Database\Seeders;

use App\Models\Log;
use App\Models\User;
use Illuminate\Database\Seeder;

class LogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::find(1);

        $logs = [
            'create' => [
                'user_id' => 1,
                'action_id' => 1,
                'description' => 'Criação teste',
                'table_id' => 1,
                'details' => [
                    'name' => $user->name,
                    'identification' => $user->identification
                ],
            ],
            'update' => [
                'user_id' => 1,
                'action_id' => 2,
                'description' => 'Atualização teste',
                'table_id' => 1,
                'details' => [
                    'name' => $user->name,
                    'identification' => $user->identification
                ],
            ],
            'delete' => [
                'user_id' => 1,
                'action_id' => 3,
                'description' => 'Exclusão teste',
                'table_id' => 1,
                'details' => [
                    'name' => $user->name,
                    'identification' => $user->identification
                ],
            ]
        ];

        foreach ($logs as $log) {
            Log::create($log);
        }
    }
}
