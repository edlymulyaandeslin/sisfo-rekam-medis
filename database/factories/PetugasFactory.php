<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Petugas>
 */
class PetugasFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => '',
            'nip' => fake()->unique()->numerify('##########'),
            'jabatan' => fake()->randomElement(['Dokter Gigi', 'Perawat', 'Dokter Umum', 'Dokter Spesialis']),
            'no_hp' => fake()->phoneNumber(),
            'alamat' => fake()->address(),
        ];
    }
}
