const {Storage} = require('@google-cloud/storage');

const gc = new Storage({
    keyFilename: './services/fashiondiscovery.json',
    projectId: 'fashion-discovery'
});

const fashionDiscoverBucket  = gc.bucket('fashion-discovery');

const uploadImage = async (file) => new Promise((resolve, reject) => {
    if (!file) {
      reject({message: 'No file to upload!'});
    }
    
    const blob = fashionDiscoverBucket.file(file.originalname);
    const blobStream = blob.createWriteStream();
    
    blobStream.on('error', err => {
        reject(err);
    });
    
    blobStream.on('finish', () => {
        resolve({message: 'File upload was successfull!'});
    });
    
    blobStream.end(file.buffer);
})

module.exports = {uploadImage}

