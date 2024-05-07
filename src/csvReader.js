const fs = require('fs');
const csv = require('csv-parser');

async function readCSV(filePath) {
    try {
        const results = [];
        await new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    resolve(results);
                })
                .on('error', (error) => {
                    reject(error);
                });
        });
        return results;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = readCSV;



