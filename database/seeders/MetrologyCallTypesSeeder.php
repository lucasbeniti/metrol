<?php

namespace Database\Seeders;

use App\Models\MetrologyCallType;
use Illuminate\Database\Seeder;

class MetrologyCallTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            'setup',
            'production',
            'adjustment',
        ];

        foreach ($types as $type) {
            MetrologyCallType::create(['name' => $type]);
        }
    }
}
