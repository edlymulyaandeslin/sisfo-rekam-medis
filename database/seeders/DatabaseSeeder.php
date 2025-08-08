<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'super@gmail.com',
            'role' => 'admin'
        ]);

        $this->call([
            UserSeeder::class,
            PetugasSeeder::class,
            PasienSeeder::class,
            PoliSeeder::class,
            KunjunganSeeder::class,
            RekamMedisSeeder::class,
        ]);
    }
}
