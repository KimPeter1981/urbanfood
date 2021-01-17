const visionService = require('./visionService');
const imageUtils = require('../utils/imageUtils');
const uploadService = require('./uploadService');
const database = require('./database/firestoreCrud');

const fashionDiscover = async (file) => {
  try {
    let result = await uploadService.uploadImage(file, 'upload/')
    let objects = await visionService.getObjectsAndLabel(result);
    await imageUtils.cutPictureParts(objects.objects, result); 
    result.objects = objects.objects;
    result.labels = objects.labels;
    await database.saveFashionSet(result);
    const uuid = {
      uuid: result.uuid
    }
    return uuid;
  } catch (e) {
    throw e;
  }
}

module.exports = {fashionDiscover}