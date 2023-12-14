const Persiapan  = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Menyiapkan Bahan ...")
        }, 3000);
    })
}

const RebusAir  = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Merebus Air ...")
        }, 7000);
    })
}

const Masak  = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Memasak Mie ...")
        }, 5000);
    })
}

const main = async () =>{
    console.log(await Persiapan())
    console.log(await RebusAir())
    console.log(await Masak())
}

main()