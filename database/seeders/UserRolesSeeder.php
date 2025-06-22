<?php

namespace Database\Seeders;

use App\Models\UserRole;
use Illuminate\Database\Seeder;

class UserRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['name' => 'admin'],
            ['name' => 'metrologist'],
            ['name' => 'operator'],
        ];

        foreach ($roles as $role) {
            UserRole::create($role);
        }
    }
}
