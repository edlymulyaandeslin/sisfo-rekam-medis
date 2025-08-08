<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kunjungan>
 */
class KunjunganFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'pasien_id' => mt_rand(1, 10), // Assuming you have 10 patients seeded
            'poli_id' => mt_rand(1, 4), // Assuming you have
            'tanggal_kunjungan' => fake()->dateTimeBetween('-1 month', 'now'),
            'keluhan_utama' => fake()->sentence(),
        ];
    }
}
