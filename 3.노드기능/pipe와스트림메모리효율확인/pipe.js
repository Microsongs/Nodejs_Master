const fs = require('fs');
// 파일을 압축하여 사용
const zlib = require('zlib');

const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16 });
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./writeme3.txt');
readStream.pipe(zlibStream).pipe(writeStream);
