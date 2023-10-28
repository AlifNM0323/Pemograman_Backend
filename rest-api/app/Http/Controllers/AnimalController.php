<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AnimalController extends Controller
{
    private $data;

    public function __construct($data = ['Kucing','Ayam','Ikan'])
    {
        $this->data = $data;
    }

    public function index(){
        echo "Menampilkan Data Animals";
        foreach ($this->data as $key => $value) {
            echo $value . "<br>";
        }
    }

    public function store(Request $request)
    {
        echo "Menambahkan Hewan Baru";
        array_push($this->data,$request->nama_hewan);
        $this->index();
    }

    public function update(Request $request,$id)
    {
        $this->data[$id] = $request->nama_hewan;
        echo "Mengupdate data hewan id $id";
        echo "<br>";
        $this->index();
    }

    public function destroy($id){
        echo "Menghapus data hewan id $id"."<br>";
        unset($this->data[$id]);
        $this->index();
    }
}
