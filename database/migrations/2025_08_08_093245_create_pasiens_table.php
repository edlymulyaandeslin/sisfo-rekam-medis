<?php

use App\Models\Pasien;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pasiens', function (Blueprint $table) {
            $table->id();
            $table->string("nik")->unique();
            $table->string("nama");
            $table->string("tempat_lahir");
            $table->date("tanggal_lahir");
            $table->enum("jenis_kelamin", [Pasien::LAKI_LAKI, Pasien::PEREMPUAN]);
            $table->text("alamat");
            $table->string("no_hp");
            $table->string("gol_darah");
            $table->enum("status_perkawinan", [Pasien::KAWIN, Pasien::BELUM_KAWIN]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pasiens');
    }
};
