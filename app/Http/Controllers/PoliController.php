<?php

namespace App\Http\Controllers;

use App\Models\Poli;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PoliController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Poli::query();

        if ($search = $request->search) {
            $query->where("nama_poli", "like", "%{$search}%");
        }

        $polis = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render("polis/index", [
            "polis" => $polis,
            "search" => $request->search
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("polis/create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate_data = $request->validate([
            "nama_poli" => "required",
            "deskripsi" => "required",
        ]);

        Poli::create($validate_data);

        return redirect()->route("poli.index")->with("success", "Poli created successfully.");
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
        $poli = Poli::findOrFail($id);

        return Inertia::render("polis/edit", [
            'poli' => $poli
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $poli = Poli::findOrFail($id);

        $rules = [
            "nama_poli" => "required",
            "deskripsi" => "required",
        ];

        $validate_data = $request->validate($rules);

        $poli->update($validate_data);

        return redirect()->route("poli.index")->with("success", "Poli updated successfully.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $poli = Poli::find($id);

        if ($poli) {
            $poli->delete();
            return redirect()->route('poli.index')->with('success', 'Poli deleted successfully.');
        }
    }
}