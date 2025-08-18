<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\CostCenter;
use Illuminate\Database\Seeder;

class CostCenterSeeder extends Seeder
{
    public function run(): void
    {
        $clients = Client::all();
        $counter = 1;

        foreach ($clients as $client) {
            foreach (range(1, 3) as $i) {
                CostCenter::create([
                    'name' => "Centro de custo {$counter}",
                    'code' => $counter,
                    'client_id' => $client->id,
                ]);
                $counter++;
            }
        }
    }
}
