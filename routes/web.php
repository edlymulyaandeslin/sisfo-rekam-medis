<?php

use Inertia\Inertia;
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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('pasiens', PasienController::class);
    Route::resource('petugas', PetugasController::class);
    Route::resource('poli', PoliController::class);
    Route::resource('kunjungan', KunjunganController::class);
    Route::resource('rekam-medis', RekamMedisController::class);
    Route::resource('users', UserController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';