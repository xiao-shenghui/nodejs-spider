
const fs = require('fs')
const path = require('path')


const write = (data,filepath,arr) => {
    return new Promise((resolve, reject) => {
            fs.writeFile(path.resolve(__dirname, filepath), JSON.stringify(data), err => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(arr)
            })
        }

    );
}

module.exports = write;