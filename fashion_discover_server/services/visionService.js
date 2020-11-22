const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient({
    keyFilename: './services/Fashion Discovery-03140797ee88.json'
});

const getObjects = async (uploadFile) => {
  const filename = './static/upload/' + uploadFile.uploadfile;
  const [result] = await client.objectLocalization(filename);
  const objects = result.localizedObjectAnnotations;
  return objects;
}

module.exports = {getObjects} 
