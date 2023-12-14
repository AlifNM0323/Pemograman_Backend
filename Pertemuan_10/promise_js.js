const download = () => {
    return new Promise((resolve, reject) => {
        const status = true
        setTimeout(() => {
            if (status) {
                resolve("Download Berhasil & Selesai ...")
            } else {
                reject("Download Gagal & Periksa Kembali ...")
            }
        }, 5000);
    })
}


download()
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })