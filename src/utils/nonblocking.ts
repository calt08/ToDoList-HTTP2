import * as fs from 'fs';

export function readFromFile(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, function (err, data) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve(data.toString());
            }
        });
    });
}