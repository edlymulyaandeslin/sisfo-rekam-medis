<?php

namespace Database\Seeders;

use App\Models\RekamMedis;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RekamMedisSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 10; $i++) {
            RekamMedis::factory()->create([
                'kunjungan_id' => $i, // Assuming you have 10 kunjungan seeded
            ]);
        }
    }
}
