<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Petugas;
use Illuminate\Http\Request;

class PetugasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Petugas::with('user');

        if ($search = $request->search) {
            $query->where("nip", "like", "%{$search}%")
                ->orWhereHas("user", function ($query) use ($search) {
                    $query->where("name", "like", "%{$search}%");
                });
        }

        $petugas = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render("petugas/index", [
            "petugas" => $petugas,
            "search" => $request->search
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::where('role', 'medis')->latest()->get();

        return Inertia::render("petugas/create", [
            'users' => $users
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate_data = $request->validate([
            "user_id" => "required",
            "nip" => "required|unique:petugas,nip",
            "jabatan" => "required",
            "no_hp" => "required|numeric",
            "alamat" => "required",
        ]);

        Petugas::create($validate_data);

        return redirect()->route("petugas.index")->with("success", "Petugas created successfully.");
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
        $ptgs = Petugas::with('user')->findOrFail($id);

        return Inertia::render("petugas/edit", [
            'ptgs' => $ptgs
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $ptgs = Petugas::findOrFail($id);

        $rules = [
            "nip" => "required|unique:petugas,nip," . $id,
            "jabatan" => "required",
            "no_hp" => "required|numeric",
            "alamat" => "required",
        ];

        $validate_data = $request->validate($rules);

        $ptgs->update($validate_data);

        return redirect()->route("petugas.index")->with("success", "Petugas updated successfully.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ptgs = Petugas::find($id);

        if ($ptgs) {
            $ptgs->delete();
            return redirect()->route('petugas.index')->with('success', 'Petugas deleted successfully.');
        }
    }
}