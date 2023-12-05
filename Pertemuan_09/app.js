const { index, store, update, destroy} = require('./controller/fruitController.js')
// const fruitController = require('./controller/fruitController.js');

let main = () => {
    console.log("Method Index - menampilkan Buah")
    index()
    console.log('-------------------------')
    console.log("Method store - Menambahkan Buah Pisang")
    store("Pisang")
    console.log('-------------------------')
    console.log("Method update - Update data 0 menjadi kelapa")
    update(0,"Kelapa")
    console.log('-------------------------')
    console.log("Method destroy - Menghapus data 0")
    destroy(0)
    console.log('-------------------------')
}

main()