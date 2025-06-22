<?php

namespace Database\Seeders;

use App\Models\Action;
use Illuminate\Database\Seeder;

class ActionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $actions = [
            'create',
            'update',
            'delete'
        ];

        foreach ($actions as $action) {
            Action::create(['name' => $action]);
        } 
    }
}
