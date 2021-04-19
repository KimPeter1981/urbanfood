const vision = require('@google-cloud/vision');
const database = require('./database/firestoreCrud');


var excludeObjects = ['Person','Window'];

const client = new vision.ImageAnnotatorClient({
    keyFilename: './services/fashiondiscovery.json'
});

const extractFashionObjectsAndLabels = async (file) => {
  const request = {
    image: {source: {imageUri: file}},
    features: [{type: 'LABEL_DETECTION', maxResults: 50},
              {type: 'OBJECT_LOCALIZATION', maxResults: 10}],
  };
  const fashionExtract = await client.annotateImage(request);
  return fashionExtract;
}

const getObjectsAndLabel = async (uploadFile) => {
  const filename = 'gs://fashion-discovery/upload/' + uploadFile.uploadfile;
  const extracts = await extractFashionObjectsAndLabels(filename);
  const objects = extracts[0].localizedObjectAnnotations;
  const labels = extracts[0].labelAnnotations;
  let objectsFiltered = objects.filter((object) => !excludeObjects.includes(object.name));
  let objectAndLabels = {
    objects: objectsFiltered,
    labels: labels
  }
  return objectAndLabels;
}

const extractFashionPiece = (clothes, piece) => {
  let filteredSnapshot = clothes.fashionSet.filter((obj) => obj.name === piece);
  return filteredSnapshot;
}

const addFashionDetails = async (fashionInfo, part, details) => {
  // let fashionSet = fashionInfo.fashionSet;
  // let index = fashionSet.findIndex((fashion) => fashion.name === part)
  // fashionSetExtended = {...fashionSet[index], ...details}
  // fashionInfo.fashionSet[index] = fashionSetExtended
  console.log('---addFashionDetails----');
  console.log(fashionInfo);
  let fashionFiles = fashionInfo.fashionSet.filter((s) => s.name === part)
  console.log('fashion files');
  console.log(fashionFiles);
  // console.log(part);
  // console.log(details);
  console.log('---addFashionDetails Info----');
  // database.save(fashionInfo);
  let fashionDetails = {
    uuid: fashionInfo.uuid,
    part: part,
    details: details,
    files: fashionFiles
  }
  database.saveDetails(fashionDetails);
}

const extractFashionDetails = async (file) => {
  const request = {
    image: {source: {imageUri: file}},
    features: [{type: 'LABEL_DETECTION', maxResults: 20},
              {type: 'LOGO_DETECTION', maxResults: 1},
              {type: 'DOCUMENT_TEXT_DETECTION', maxResults: 1}],
  };
  const fashionDetails = await client.annotateImage(request);
  const extracts = {
    labels: fashionDetails[0].labelAnnotations,
    logos: fashionDetails[0].logoAnnotations,
    text: fashionDetails[0].textAnnotations
  }
  return extracts;
}

const getObjectDetails = async (id, piece) => {
  const clothes = await database.fashionSetPreview(id);
  const details = extractFashionPiece(clothes, piece);

  let completeResult = {
    labels: [],
    logos: [],
    text: []
  }

  //Hier Bugfixing
  if (!details[0].labels) {
    console.log('--Determine Details from API--');
    const filename = 'gs://fashion-discovery/fashion/' + piece + '/' + details[0].fashionFiles[0].name;
    const fash_details = await extractFashionDetails(filename);
    for (i=0;i<fash_details.labels.length;i++) {
      completeResult.labels.push({name: fash_details.labels[i].description, score: fash_details.labels[i].score});
    }
    for (i=0;i<fash_details.logos.length;i++) {
      completeResult.logos.push({name:fash_details.logos[i].description, score: fash_details.logos[i].score});
    }
    for (i=0;i<fash_details.text.length;i++) {
      completeResult.text.push({name: fash_details.text[i].description, score: fash_details.text[i].confidence});
    }
    addFashionDetails(clothes, piece, completeResult);
  } else {
    console.log('--Determine details from Database---');
    completeResult.labels = details[0].labels;
    completeResult.logos = details[0].logos;
    completeResult.text = details[0].text
  }

  return completeResult;
}

module.exports = {getObjectsAndLabel, getObjectDetails} 
