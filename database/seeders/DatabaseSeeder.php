<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            ClientSeeder::class,
            CostCenterSeeder::class,
            ItemSeeder::class,
            OperationSeeder::class,
            ToolSeeder::class,
            MachineSeeder::class,
            MetrologyCallSeeder::class,
        ]);
    }
}
