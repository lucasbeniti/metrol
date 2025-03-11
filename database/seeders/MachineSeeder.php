<?php

namespace Database\Seeders;

use App\Models\Machine;
use Illuminate\Database\Seeder;

class MachineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Machine::create([
            'name' => 'Machine 1',
            'code' => '1',
            'operation_id' => '1'
        ]);
    }
}
