const {Storage} = require('@google-cloud/storage');

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

module.exports = {uploadImage}

