const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient({
    keyFilename: './services/fashion-discovery-76368c77cb55.json'
});

const getObjects = async (uploadFile) => {
  const filename = './static/upload/' + uploadFile.uploadfile;
  const [result] = await client.objectLocalization(filename);
  const objects = result.localizedObjectAnnotations;
  objects.forEach(object => console.log(object));
  console.log(objects.length);
  return objects;
}

module.exports = {getObjects} 

//const getCropHints = async () => {
//  const [result] = await client.cropHints('./isabel.jpg');
//  const crops = result.cropHintsAnnotation;
  //crops.forEach(crop => console.log(crop));
//  console.log(crops.cropHints[0].boundingPoly);
//}

// const test = async () => {
//    const objects = await getObjects();
//    console.log(JSON.stringify(objects));
//}

//test();