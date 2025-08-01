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
        $openedMetrologyCall = [
            'machine_id' => 1,
            'operation_id' => 1,
            'opened_by_user_id' => 1,
            'metrology_call_type_id' => 1,
            'metrology_call_status_id' => 1
        ];

        $closedMetrologyCall = [
            'machine_id' => 1,
            'operation_id' => 1,
            'opened_by_user_id' => 1,
            'metrology_call_type_id' => 1,
            'closed_by_user_id' => 1,
            'metrology_call_status_id' => 1,
            'received_at' => now(),
            'closed_at' => now()
        ];

        MetrologyCall::create($openedMetrologyCall);
        MetrologyCall::create($closedMetrologyCall);
    }
}
