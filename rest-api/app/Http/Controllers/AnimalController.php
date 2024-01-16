<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class AnimalController extends Controller
{
    private $data;

    public function __construct($data = ['Kucing', 'Ayam', 'Ikan'])
    {
        $this->data = $data;
    }

    public function index()
    {
        $message = "Menampilkan Data Animals";
        $animals = $this->data;

        return view('animals.index', compact('message', 'animals'));
    }

    public function store(Request $request)
    {
        try {
            array_push($this->data, $request->nama_hewan);
            $this->saveData();
            return redirect()->route('animals.index')->with('success', 'Hewan berhasil ditambahkan.');
        } catch (\Exception $e) {
            return redirect()->route('animals.index')->with('error', 'Gagal menambahkan hewan.');
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $this->data[$id] = $request->nama_hewan;
            $this->saveData();
            return redirect()->route('animals.index')->with('success', "Data hewan id $id berhasil diupdate.");
        } catch (\Exception $e) {
            return redirect()->route('animals.index')->with('error', "Gagal mengupdate data hewan id $id.");
        }
    }

    public function destroy($id)
    {
        try {
            unset($this->data[$id]);
            $this->saveData();
            return redirect()->route('animals.index')->with('success', "Data hewan id $id berhasil dihapus.");
        } catch (\Exception $e) {
            return redirect()->route('animals.index')->with('error', "Gagal menghapus data hewan id $id.");
        }
    }

    
}
