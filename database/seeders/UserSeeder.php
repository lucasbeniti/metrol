<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'identification' => '1',
            'password' => Hash::make('123'),
            'type' => 'admin'
        ]);

        User::create([
            'name' => 'Metrologista',
            'identification' => '2',
            'password' => Hash::make('123'),
            'type' => 'metrologist'
        ]);

        User::create([
            'name' => 'Produção',
            'identification' => '3',
            'password' => Hash::make('123'),
            'type' => 'production'
        ]);
    }
}
