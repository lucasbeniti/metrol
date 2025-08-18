<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\Operation;
use Illuminate\Database\Seeder;

class OperationSeeder extends Seeder
{
    public function run(): void
    {
        $items = Item::all();
        $counter = 1;

        foreach ($items as $item) {
            foreach (range(1, 2) as $i) {
                Operation::create([
                    'name' => "Operação {$counter}",
                    'code' => $counter,
                    'item_id' => $item->id,
                ]);
                $counter++;
            }
        }
    }
}
