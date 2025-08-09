<?php

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Pasien;
use App\Models\Kunjungan;
use App\Models\RekamMedis;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PoliController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PasienController;
use App\Http\Controllers\PetugasController;
use App\Http\Controllers\KunjunganController;
use App\Http\Controllers\RekamMedisController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        $jumlah_pasien = Pasien::count();
        $jumlah_kunjungan = Kunjungan::whereDate('tanggal_kunjungan', now())->count();
        $jumlah_rekammedis = RekamMedis::whereBetween('created_at', [now()->startOfDay(), now()->endOfDay()])->count();

        // Data grafik 7 hari terakhir
        $grafik_kunjungan = collect(range(6, 0))->map(function ($i) {
            $tanggal = Carbon::today()->subDays($i);
            return [
                'tanggal' => $tanggal->format('d M'),
                'jumlah' => Kunjungan::whereDate('tanggal_kunjungan', $tanggal)->count(),
            ];
        });

        return Inertia::render('dashboard', [
            'jumlah_pasien' => $jumlah_pasien,
            'jumlah_kunjungan' => $jumlah_kunjungan,
            'jumlah_rekammedis' => $jumlah_rekammedis,
            'grafik_kunjungan' => $grafik_kunjungan,
        ]);
    })->name('dashboard');

    Route::resource('rekam-medis', RekamMedisController::class);
});

Route::middleware('is_admin')->group(function(){
    Route::resource('pasiens', PasienController::class);
    Route::resource('petugas', PetugasController::class);
    Route::resource('poli', PoliController::class);
    Route::resource('kunjungan', KunjunganController::class);
    Route::resource('users', UserController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';