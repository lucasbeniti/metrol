<?php

namespace Database\Seeders;

use App\Models\MetrologyCall;
use App\Models\Machine;
use App\Models\Operation;
use App\Models\User;
use App\Models\MetrologyCallType;
use App\Models\MetrologyCallStatus;
use Illuminate\Database\Seeder;

class MetrologyCallSeeder extends Seeder
{
    public function run(): void
    {
        $machines = Machine::all();
        $operations = Operation::all();
        $users = User::all();
        $types = MetrologyCallType::all();
        $statuses = MetrologyCallStatus::all();

        foreach (range(1, 30) as $i) {
            $isClosed = rand(0, 1); 

            $data = [
                'machine_id' => $machines->random()->id,
                'operation_id' => $operations->random()->id,
                'opened_by_user_id' => $users->random()->id,
                'metrology_call_type_id' => $types->random()->id,
                'metrology_call_status_id' => $statuses->random()->id,
            ];

            if ($isClosed) {
                $data['closed_by_user_id'] = $users->random()->id;
                $data['received_at'] = now()->subDays(rand(1, 10));
                $data['closed_at'] = now()->subDays(rand(0, 5));
            }

            MetrologyCall::create($data);
        }
    }
}
