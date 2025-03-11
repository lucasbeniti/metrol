<?php

namespace Database\Seeders;

use App\Models\CostCenter;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CostCenterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CostCenter::create([
            'name' => 'Centro de Custo 1',
            'code' => '1',
            'client_id' => 1,
        ]);
    }
}
