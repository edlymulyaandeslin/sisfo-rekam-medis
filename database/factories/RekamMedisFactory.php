<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RekamMedis>
 */
class RekamMedisFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'kunjungan_id' => '',
            'tekanan_darah' => fake()->randomElement(['120/80', '130/85', '140/90']),
            'suhu' => fake()->randomFloat(1, 36.0, 38.0), // Random temperature between 36.0 and 38.0
            'diagnosa' => fake()->sentence(),
            'obat' => fake()->sentence(),
            'catatan' => fake()->sentence(),
        ];
    }
}
