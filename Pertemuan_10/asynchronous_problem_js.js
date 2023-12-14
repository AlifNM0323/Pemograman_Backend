
const Persiapan = () => {
    setTimeout(() => {
        console.log("Menyiapkan Bahan ...")
    }, 3000);
}

const RebusAir = () => {
    setTimeout(() => {
        console.log("Merebus Air ...")
    }, 7000);
}

const Masak = () => {
    setTimeout(() => {
        console.log("Memasak Mie...")
        console.log("Selesai...")
    }, 5000);
}

const main = () => {
    Persiapan()
    RebusAir()
    Masak()
}

main()