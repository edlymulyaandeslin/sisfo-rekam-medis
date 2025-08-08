<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pasien extends Model
{
    /** @use HasFactory<\Database\Factories\PasienFactory> */
    use HasFactory;
    protected $guarded = [];

    public const LAKI_LAKI = 'L';
    public const PEREMPUAN = 'P';

    public const KAWIN = 'Kawin';
    public const BELUM_KAWIN = 'Belum Kawin';

    public function kunjungan()
    {
        return $this->hasMany(Kunjungan::class);
    }
}
