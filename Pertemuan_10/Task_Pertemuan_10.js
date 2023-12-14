

const successDownload = () => {
    
    setTimeout(() => {
        return "Success Download ..."
    }, 3000);
}

const showDownloadResult = (result) => {
    return "Result Download : " + result
}
const processcingDownload =  (result) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Download Processing ...")
        }, 3000);

    console.log(successDownload())
    console.log(showDownloadResult(result))
    })
}

const download = async (result) => {
    console.log(await download(processcingDownload(result)))
}

const main = () => {
    let data = "windowns-11.exe"
    download(data)
}

main()