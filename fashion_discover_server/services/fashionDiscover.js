const fs = require('fs');

const fashionDiscover = async (file) => new Promise((resolve, reject) => {
    if (!file) {
      reject({message: 'No file to upload!'});
    }
    
    console.log(file);
    
    const blobStream = fs.createWriteStream('./static/upload/test.jpg');
    
    blobStream.on('error', err => {
         reject(err);
    });
    
    blobStream.on('finish', () => {
        resolve({message: 'File upload was successfull!'});
    });
    
    blobStream.end(file.buffer);
})

console.log(__dirname);

let mime = 'image/png';
let path = './static/upload/test.' + mime.split('/')[1];
console.log(path);

module.exports = {fashionDiscover}