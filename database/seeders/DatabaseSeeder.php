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
            UserRolesSeeder::class,
            UserSeeder::class,
            TablesSeeder::class,
            ActionsSeeder::class,
            MetrologyCallStatusesSeeder::class,
            MetrologyCallTypesSeeder::class,
            ClientSeeder::class,
            CostCenterSeeder::class,
            ItemSeeder::class,
            OperationSeeder::class,
            MachineSeeder::class,
            LogSeeder::class
        ]);

        $this->command->info('Os seeders foram executados com sucesso!');
        $this->command->info('Para deixar as tabelas apenas com esses dados, execute: php artisan migrate:fresh --seed');
        $this->command->info('A senha de todos os usuários é: 123. A identificação do administrador é: 1. A do metrologista é: 2. A do operador é: 3.');
    }
}
