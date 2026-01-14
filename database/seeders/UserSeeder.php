<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 🔹 Clear cached roles & permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // 🔹 Seed Roles first
        $adminRole = Role::firstOrCreate(['name' => 'Admin']);
        $userRole  = Role::firstOrCreate(['name' => 'User']);

        // 🔹 Seed Users
        User::upsert([
            [
                'id' => 1,
                'name' => 'admin',
                'email' => 'admin@mail.com',
                'mobile' => '0000000001',
                'password' => Hash::make('password'),
            ],
            [
                'id' => 2,
                'name' => 'user',
                'email' => 'user@mail.com',
                'mobile' => '0000000002',
                'password' => Hash::make('password'),
            ],
        ], ['id']);

        // 🔹 Assign Roles
        User::find(1)?->assignRole($adminRole);
        User::find(2)?->assignRole($userRole);
    }
}
