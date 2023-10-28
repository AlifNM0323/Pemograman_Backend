<?php 
 class Animal {
    private $animals = array();
    
    // private $operation = "";
    public function __construct($data) {
        // Mengisi data awal animals (array)
        $this->animals = $data;
    }

    // Menampilkan seluruh data animals
    public function index() {
        echo "Index - Menampilkan seluruh hewan\n";
        foreach ($this->animals as $animal) {
            echo  "<br>" . " - $animal\n";
        }
        echo "\n";
        
    }

    // Menambahkan hewan baru
    public function store($data) {
      $spasi = " ";
      array_push($this->animals, $data);
      echo "$data" . $spasi;

       
    }

    // Memperbarui data hewan
    public function update($index, $data) {
        // $index = array_search($oldAnimal, $this->animals);
        // if ($index !== false) {
        //     $this->animals[$index] = $newAnimal;
        // }
        // echo "Update - Mengupdate hewan\n";
        // $this->index(); // Memanggil method index untuk menampilkan seluruh data
        if (isset($this->animals[$index])) {
          $this->animals[$index] = $data;
          echo " $index $data.<br>";
      } else {
          echo "Mengupdate Hewan.<br>";
      }

    }

    // Menghapus data hewan
    public function destroy($index) {
      if (isset($this->animals[$index])) {
        unset($this->animals[$index]);
        $this->animals = array_values($this->animals);
        echo " $index .<br>";
    } else {
       echo "Menghapus Hewan";
    }
}

}

// Contoh penggunaan class Animal
$animal = new Animal(['Ayam', 'Ikan']);
echo "<br>";
$animal->index();
echo "<br>";

echo "Store - Menambahkan hewan baru <br>";
$animal->store('Burung');
$animal->index();
echo "<br>";

echo "Update - Mengupdate hewan <br>";
$animal->update(0, 'Kucing Anggora');
$animal->index();
echo "<br>";

echo "Destroy - Menghapus hewan <br>";
$animal->destroy(1);
$animal->index();

?>