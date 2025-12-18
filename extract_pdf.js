
import fs from 'fs';
import pdf from 'pdf-parse';

const dataBuffer = fs.readFileSync('Booklet RIW 2025-26 - 8th (1).pdf');

pdf(dataBuffer).then(function (data) {
    console.log(data.text);
}).catch(function (error) {
    console.error(error);
});
