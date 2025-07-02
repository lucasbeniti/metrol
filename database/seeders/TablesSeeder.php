<?php

namespace Database\Seeders;

use App\Models\Table;
use Illuminate\Database\Seeder;

class TablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tables = [
            'users',
            'clients',
            'cost_centers',
            'items',
            'operations',
            'machines',
            'metrology_calls',
        ];

        foreach ($tables as $table) {
            Table::create(['name' => $table]);
        }
    }
}
