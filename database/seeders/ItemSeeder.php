<?php

namespace Database\Seeders;

use App\Models\Item;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $item = [
            'name' => 'Item 1',
            'code' => '1',
            'cost_center_id' => 1,
        ];

        Item::create($item);
    }
}
