<?php

namespace App\Http\Controllers;

use App\Models\Poli;
use Inertia\Inertia;
use App\Models\Pasien;
use App\Models\Kunjungan;
use Illuminate\Http\Request;

class KunjunganController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Kunjungan::with(['pasien', 'poli']);

        if ($search = $request->search) {
            $query->whereHas('pasien', function ($q) use ($search) {
                $q->where("nama", "like", "%{$search}%");
            })->orWhereHas('poli', function ($q) use ($search) {
                $q->where("nama_poli", "like", "%{$search}%");
            });
        }

        $kunjungan = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render("kunjungan/index", [
            "kunjungan" => $kunjungan,
            "search" => $request->search
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $pasiens = Pasien::latest()->get();
        $polis = Poli::latest()->get();

        return Inertia::render("kunjungan/create", [
            'pasiens' => $pasiens,
            'polis' => $polis
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate_data = $request->validate([
            "pasien_id" => "required",
            "poli_id" => "required",
            "tanggal_kunjungan" => "required|date",
            "keluhan_utama" => "required",
        ]);

        Kunjungan::create($validate_data);

        return redirect()->route("kunjungan.index")->with("success", "Kunjungan created successfully.");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $kunjung = Kunjungan::findOrFail($id);
        $pasiens = Pasien::latest()->get();
        $polis = Poli::latest()->get();

        return Inertia::render("kunjungan/edit", [
            'kunjung' => $kunjung,
            'pasiens' => $pasiens,
            'polis' => $polis
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $kunjung = Kunjungan::findOrFail($id);

        $rules = [
            "pasien_id" => "required",
            "poli_id" => "required",
            "tanggal_kunjungan" => "required|date",
            "keluhan_utama" => "required",
        ];

        $validate_data = $request->validate($rules);

        $kunjung->update($validate_data);

        return redirect()->route("kunjungan.index")->with("success", "Kunjungan updated successfully.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $kunjung = Kunjungan::find($id);

        if ($kunjung) {
            $kunjung->delete();
            return redirect()->route('kunjungan.index')->with('success', 'Kunjungan deleted successfully.');
        }
    }
}