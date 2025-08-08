<?php

namespace Database\Factories;

use App\Models\Pasien;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pasien>
 */
class PasienFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nik' => fake()->unique()->numerify('##########'),
            'nama' => fake()->name(),
            'tempat_lahir' => fake()->city(),
            'tanggal_lahir' => fake()->date(),
            'jenis_kelamin' => fake()->randomElement([Pasien::LAKI_LAKI, Pasien::PEREMPUAN]),
            'alamat' => fake()->address(),
            'no_hp' => fake()->phoneNumber(),
            'gol_darah' => fake()->randomElement(['A', 'B', 'AB', 'O']),
            'status_perkawinan' => fake()->randomElement([Pasien::KAWIN, Pasien::BELUM_KAWIN]),
        ];
    }
}
