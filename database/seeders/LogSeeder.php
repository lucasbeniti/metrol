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
        $log = [
            'user_id' => 1,
            'action_id' => 1,
            'description' => 'Log de teste',
            'table_id' => 1,
        ];

        Log::create($log);
    }
}
