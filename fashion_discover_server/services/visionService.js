const vision = require('@google-cloud/vision');
const database = require('./database/firestoreCrud');


var excludeObjects = ['Person','Window'];

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

const getObjectDetails = async (id, part) => {
  const details = await database.fashionMetaData(id, part);
  const filename = 'gs://fashion-discovery/fashion/' + details.fashionFiles[0];
  console.log(filename);
  const [labelDetect] = await client.labelDetection(filename);
  const labels = labelDetect.labelAnnotations;
  const [logoDetect] = await client.logoDetection(filename);
  const logos = logoDetect.logoAnnotations;
  const [textDetect] = await client.textDetection(filename);
  const text = textDetect.textAnnotations;
  const completeResult = {
    labels: [],
    logos: [],
    text: []
  }
  for (i=0;i<labels.length;i++) {
    completeResult.labels.push(labels[i].description);
  }
  for (i=0;i<logos.length;i++) {
    completeResult.logos.push(logos[i].description);
  }
  for (i=0;i<text.length;i++) {
    completeResult.text.push(text[i].description);
  }
  return completeResult;
}

module.exports = {getObjects, getObjectDetails} 
