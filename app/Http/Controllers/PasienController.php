<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pasien;
use Illuminate\Http\Request;

class PasienController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Pasien::query();

        if ($search = $request->search) {
            $query->where("nik", "like", "%{$search}%")
                ->orWhere("nama", "like", "%{$search}%");
        }

        $pasiens = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render("pasiens/index", [
            "pasiens" => $pasiens,
            "search" => $request->search
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("pasiens/create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate_data = $request->validate([
            "nik" => "required|unique:pasiens,nik",
            "nama" => "required",
            "tempat_lahir" => "required",
            "tanggal_lahir" => "required|date",
            "jenis_kelamin" => "required",
            "alamat" => "required",
            "no_hp" => "required|numeric",
            "gol_darah" => "required",
        ]);

        Pasien::create($validate_data);

        return redirect()->route("pasiens.index")->with("success", "Pasien created successfully.");
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
        $pasien = Pasien::findOrFail($id);

        return Inertia::render("pasiens/edit", [
            'pasien' => $pasien
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $pasien = Pasien::findOrFail($id);

        $rules = [
            "nik" => "required|unique:pasiens,nik," . $id,
            "nama" => "required",
            "tempat_lahir" => "required",
            "tanggal_lahir" => "required|date",
            "jenis_kelamin" => "required",
            "alamat" => "required",
            "no_hp" => "required|numeric",
            "gol_darah" => "required",
        ];

        $validate_data = $request->validate($rules);

        $pasien->update($validate_data);

        return redirect()->route("pasiens.index")->with("success", "Pasien updated successfully.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $pasien = Pasien::find($id);

        if ($pasien) {
            $pasien->delete();
            return redirect()->route('pasiens.index')->with('success', 'Pasien deleted successfully.');
        }
    }
}