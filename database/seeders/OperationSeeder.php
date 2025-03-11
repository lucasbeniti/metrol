<?php

namespace Database\Seeders;

use App\Models\Operation;
use Illuminate\Database\Seeder;

class OperationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Operation::create([
            'name' => 'Operação 1',
            'code' => '1',
            'item_id' => 1,
            'cost_center_id' => 1,
        ]);
    }
}
