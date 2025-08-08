<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Petugas;
use App\Models\Kunjungan;
use App\Models\RekamMedis;
use Illuminate\Http\Request;

class RekamMedisController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = RekamMedis::with(['kunjungan.pasien', 'kunjungan.poli', 'petugas.user']);

        if ($search = $request->search) {
            $query->whereHas('kunjungan.pasien', function ($q) use ($search) {
                $q->where("nama", "like", "%{$search}%");
            })->orWhereHas('petugas.user', function ($q) use ($search) {
                $q->where("name", "like", "%{$search}%");
            });
        }

        $rekammedis = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render("rekam-medis/index", [
            "rekammedis" => $rekammedis,
            "search" => $request->search
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $kunjungan = Kunjungan::with(['pasien', 'poli'])->latest()->get();
        $petugas = Petugas::with('user')->latest()->get();

        return Inertia::render("rekam-medis/create", [
            'kunjungan' => $kunjungan,
            'petugas' => $petugas
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate_data = $request->validate([
            "kunjungan_id" => "required",
            "petugas_id" => "required",
            "tekanan_darah" => "required",
            "suhu" => "required|numeric",
            "diagnosa" => "required",
            "obat" => "required",
            "catatan" => "required",
        ]);

        RekamMedis::create($validate_data);

        return redirect()->route("rekam-medis.index")->with("success", "Rekam Medis created successfully.");
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
        $rekmed = RekamMedis::findOrFail($id);
        $kunjungan = Kunjungan::with(['pasien', 'poli'])->latest()->get();
        $petugas = Petugas::with('user')->latest()->get();


        return Inertia::render("rekam-medis/edit", [
            'rekmed' => $rekmed,
            'kunjungan' => $kunjungan,
            'petugas' => $petugas
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $rekmed = RekamMedis::findOrFail($id);

        $rules = [
            "kunjungan_id" => "required",
            "petugas_id" => "required",
            "tekanan_darah" => "required",
            "suhu" => "required|numeric",
            "diagnosa" => "required",
            "obat" => "required",
            "catatan" => "required",
        ];

        $validate_data = $request->validate($rules);

        $rekmed->update($validate_data);

        return redirect()->route("rekam-medis.index")->with("success", "Rekam Medis updated successfully.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $rekmed = RekamMedis::find($id);

        if ($rekmed) {
            $rekmed->delete();
            return redirect()->route('rekam-medis.index')->with('success', 'Rekam Medis deleted successfully.');
        }
    }
}