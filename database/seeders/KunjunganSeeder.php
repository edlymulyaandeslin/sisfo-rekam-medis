<?php

namespace Database\Seeders;

use App\Models\Kunjungan;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class KunjunganSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Kunjungan::factory(10)->create();
    }
}
