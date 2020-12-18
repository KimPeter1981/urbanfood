const vision = require('@google-cloud/vision');

var excludeObjects = ['Person'];

const client = new vision.ImageAnnotatorClient({
    keyFilename: './services/fashiondiscovery.json'
});

const getObjects = async (uploadFile) => {
  const filename = 'gs://fashion-discovery/upload/' + uploadFile.uploadfile;
  const [result] = await client.objectLocalization(filename);
  const objects = result.localizedObjectAnnotations;
  let objectsFiltered = objects.filter((object) => !excludeObjects.includes(object.name));
  return objectsFiltered;
}

module.exports = {getObjects} 
