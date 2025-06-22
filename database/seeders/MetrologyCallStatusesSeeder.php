<?php

namespace Database\Seeders;

use App\Models\MetrologyCallStatus;
use Illuminate\Database\Seeder;

class MetrologyCallStatusesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = [
            'approved',
            'rejected',
            'waiting_receive',
            'waiting_measurement',
        ];

        foreach ($statuses as $status) {
            MetrologyCallStatus::create(['name' => $status]);
        }
    }
}
