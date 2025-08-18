<?php

namespace Database\Seeders;

use App\Models\CostCenter;
use App\Models\Item;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    public function run(): void
    {
        $costCenters = CostCenter::all();
        $counter = 1;

        foreach ($costCenters as $cc) {
            foreach (range(1, 4) as $i) {
                Item::create([
                    'name' => "Item {$counter}",
                    'code' => $counter,
                    'cost_center_id' => $cc->id,
                ]);
                $counter++;
            }
        }
    }
}
