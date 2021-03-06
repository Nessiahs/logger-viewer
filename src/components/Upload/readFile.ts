export const readFile = (file: File): Promise<object> => {

    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.addEventListener('load', (e) => {
            try {
                resolve(JSON.parse(fileReader.result as string));
            } catch (err) {
                reject({error: 'Can`t parse JSON'})
            }
        })

        fileReader.readAsText(file)
    })
}
