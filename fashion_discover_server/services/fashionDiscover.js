const fs = require('fs');1
const visionService = require('./visionService');
const imageUtils = require('../utils/imageUtils');

const fashionImageUpload = async (file) => new Promise((resolve, reject) => {
    if (!file) {
      reject({message: 'No file to upload!'});
    }
    
    let files = {
      uploadfile: file.originalname 
    }

    const filename = './static/upload/' + file.originalname;

    const blobStream = fs.createWriteStream(filename);
    
    blobStream.on('error', err => {
         reject(err);
    });
    
    blobStream.on('finish', () => {
        resolve(files);
    });
    
    blobStream.end(file.buffer);

})

const fashionDiscover = async (file) => {
  try {
    let result = await fashionImageUpload(file);
    let objects = await visionService.getObjects(result);
    let fashionPaths = await imageUtils.cutPictureParts(objects, result.uploadfile); 
    result.objects = objects;
    result.fashionPaths = fashionPaths;
    return result;
  } catch (e) {
    throw e;
  }
}

module.exports = {fashionDiscover}