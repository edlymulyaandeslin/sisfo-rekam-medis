<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kunjungan extends Model
{
    /** @use HasFactory<\Database\Factories\KunjunganFactory> */
    use HasFactory;
    protected $guarded = [];

    public function pasien()
    {
        return $this->belongsTo(Pasien::class);
    }

    public function poli()
    {
        return $this->belongsTo(Poli::class);
    }

    public function petugas()
    {
        return $this->belongsTo(Petugas::class);
    }
}
