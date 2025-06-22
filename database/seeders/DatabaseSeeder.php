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
        ]);
    }
}
