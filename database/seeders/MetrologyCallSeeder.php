<?php

namespace Database\Seeders;

use App\Models\MetrologyCall;
use Illuminate\Database\Seeder;

class MetrologyCallSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MetrologyCall::create([
            'item_name' => 'Item 1',
            'machine_id' => 1,
            'operation_id' => 1,
            'type' => 'setup',
            'user_id' => 1,
            'status' => 'ok',
            'closed_at' => now(),
        ]);
    }
}
