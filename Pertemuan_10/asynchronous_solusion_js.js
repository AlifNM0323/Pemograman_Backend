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

const main = () => {
    Persiapan()
    .then((res) => {
        console.log(res)
        return RebusAir()
    })
    .then((res) => {
        console.log(res)
        return Masak()
    }).then((res)=>{
        console.log(res)
    })

}

main()