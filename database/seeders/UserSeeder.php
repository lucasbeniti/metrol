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
        $users = [
            'Administrador' => [
                'identification' => '1',
                'password' => '123',
                'user_role_id' => 1
            ],
            'Metrologista' => [
                'identification' => '2',
                'password' => '123',
                'user_role_id' => 2
            ],
            'Operador' => [
                'identification' => '3',
                'password' => '123',
                'user_role_id' => 3
            ]
        ];
        foreach ($users as $name => $user) {
            User::create([
                'name' => $name,
                'identification' => $user['identification'],
                'password' => Hash::make($user['password']),
                'user_role_id' => $user['user_role_id']
            ]);
        }
    }
}
