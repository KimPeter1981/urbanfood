const {Storage} = require('@google-cloud/storage');
// const sharp = require('sharp');

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
  const path = 'upload/Baumwollpulover.jpg';
  const blobRead = fashionDiscoverBucket.file(path);
  var readableStream = blobRead.createReadStream();
  var writableStream = fs.createWriteStream('./services/blue_mantel2.jpg');
  var blobWrite = fashionDiscoverBucket.file('fashion/Baumwollpulover.jpg');
  var writableStream = blobWrite.createWriteStream(); 

  const extract = sharp().extract({ left: 0, top: 0, width: 100, height: 100 }).jpeg();
  readableStream.pipe(extract).pipe(writableStream);

  readableStream.on('end', () => {
    console.log('Finish');
  });
}

// sharpTest();

module.exports = {uploadImage}

