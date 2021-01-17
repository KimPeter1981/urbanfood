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

const extractFashionPiece = (clothes, piece) => {
  let filteredSnapshot = clothes.fashionSet.filter((obj) => obj.name === piece);
  return filteredSnapshot;
}

const addFashionDetails = async (fashionInfo, part, details) => {
  let fashionSet = fashionInfo.fashionSet;
  let index = fashionSet.findIndex((fashion) => fashion.name === part)
  fashionSetExtended = {...fashionSet[index], ...details}
  fashionInfo.fashionSet[index] = fashionSetExtended
  database.save(fashionInfo);
}

const getObjectDetails = async (id, piece) => {
  const clothes = await database.fashionSetPreview(id);
  const details = extractFashionPiece(clothes, piece);
  const filename = 'gs://fashion-discovery/fashion/' + details[0].fashionFiles[0];
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

  addFashionDetails(clothes, piece, completeResult);

  return completeResult;
}

module.exports = {getObjects, getObjectDetails} 
