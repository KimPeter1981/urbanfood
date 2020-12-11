const {Storage} = require('@google-cloud/storage');
const { v4: uuidv4 } = require('uuid');

const gc = new Storage({
    keyFilename: './services/fashiondiscovery.json',
    projectId: 'fashion-discovery'
});

const fashionDiscoverBucket  = gc.bucket('fashion-discovery');

const uploadImage = async (file, folder) => new Promise((resolve, reject) => {
    if (!file) {
      reject({message: 'No file to upload!'});
    }

    let uuid = uuidv4();

    let files = {
                uploadfile: uuid + '_' + file.originalname,
                uuid: uuid
            }   
    
    const path = folder + files.uploadfile;

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

