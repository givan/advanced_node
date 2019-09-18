const fs = require('fs');
const zlib = require('zlib');

const fileName = process.argv[2]; 

fs.createReadStream(fileName)
.pipe(zlib.createGzip()).on('data', () => { process.stdout.write('.') })
.pipe(fs.createWriteStream(`${fileName}.gz`)).on('finish', () => { console.log('Done writing the gz file')});