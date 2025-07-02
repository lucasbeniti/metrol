<?php

namespace Database\Seeders;

use App\Models\Log;
use Illuminate\Database\Seeder;

class LogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $logs = [
            'create' => [
                'user_id' => 1,
                'action_id' => 1,
                'description' => 'Criação teste',
                'table_id' => 1,
            ],
            'update' => [
                'user_id' => 1,
                'action_id' => 2,
                'description' => 'Atualiação teste',
                'table_id' => 1,
            ],
            'delete' => [
                'user_id' => 1,
                'action_id' => 3,
                'description' => 'Deleção teste',
                'table_id' => 1,
            ]
        ];

        foreach ($logs as $log) {
            Log::create($log);
        }
    }
}
