const visionService = require('./visionService');
const imageUtils = require('../utils/imageUtils');
const uploadService = require('./uploadService');
const database = require('./database/firestoreCrud');

const fashionDiscover = async (file) => {
  try {
    let result = await uploadService.uploadImage(file, 'upload/')
    let objects = await visionService.getObjects(result);
    let fashionPaths = await imageUtils.cutPictureParts(objects, result); 
    result.objects = objects;
    result.fashionPaths = fashionPaths;
    await database.saveFashionSet(result);
    return result;
  } catch (e) {
    throw e;
  }
}

module.exports = {fashionDiscover}