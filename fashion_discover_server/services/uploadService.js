const {Storage} = require('@google-cloud/storage');
const sharp = require('sharp');

var fs = require('fs');

const gc = new Storage({
    keyFilename: './services/fashiondiscovery.json',
    projectId: 'fashion-discovery'
});

const fashionDiscoverBucket  = gc.bucket('fashion-discovery');

const uploadImage = async (file, folder) => new Promise((resolve, reject) => {
    if (!file) {
      reject({message: 'No file to upload!'});
    }

    let files = {
              uploadfile: file.originalname 
            }
    
    const path = folder + file.originalname;

    const blob = fashionDiscoverBucket.file(path);
    const blobStream = blob.createWriteStream();
    
    blobStream.on('error', err => {
        reject(err);
    });
    
    blobStream.on('finish', () => {
        resolve(files);
    });
    
    blobStream.end(file.buffer);
})

const sharpTest = () => {
  var readableStream = fs.createReadStream('blue_mantel.jpg');
  var writableStream = fs.createWriteStream('blue_mantel2.jpg');
  readableStream.pipe(writableStream);

  readableStream.on('finish', () => {
    console.log('Finish');
  });
}

sharpTest();

module.exports = {uploadImage}

