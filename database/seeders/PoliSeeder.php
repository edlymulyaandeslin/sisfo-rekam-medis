<?php

namespace Database\Seeders;

use App\Models\Poli;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PoliSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $list_poli = ['Poli Umum', 'Poli Gigi', 'Poli Anak', 'Poli Kandungan'];

        foreach ($list_poli as $poli) {
            Poli::factory()->create([
                'nama_poli' => $poli,
            ]);
        }
    }
}
