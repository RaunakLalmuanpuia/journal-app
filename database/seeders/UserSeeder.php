<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // 🔹 Clear cached roles & permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // 🔹 Roles
        $adminRole = Role::firstOrCreate(['name' => 'Admin']);
        $userRole  = Role::firstOrCreate(['name' => 'User']);

        // 🔹 Users
        User::upsert([
            [
                'id' => 1,
                'name' => 'Admin',
                'email' => 'admin@mail.com',
                'mobile' => '9000000001',
                'password' => Hash::make('password'),
            ],
            [
                'id' => 2,
                'name' => 'User One',
                'email' => 'user1@mail.com',
                'mobile' => '9000000002',
                'password' => Hash::make('password'),
            ],
            [
                'id' => 3,
                'name' => 'User Two',
                'email' => 'user2@mail.com',
                'mobile' => '9000000003',
                'password' => Hash::make('password'),
            ],
            [
                'id' => 4,
                'name' => 'User Three',
                'email' => 'user3@mail.com',
                'mobile' => '9000000004',
                'password' => Hash::make('password'),
            ],
        ], ['id']);

        // 🔹 Assign Roles
        User::find(1)?->assignRole($adminRole);

        User::whereIn('id', [2, 3, 4])
            ->get()
            ->each(fn ($user) => $user->assignRole($userRole));
    }
}
