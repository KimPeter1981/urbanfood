const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient({
    keyFilename: './Fashion Discovery-03140797ee88.json'
});

const getObjects = async () => {
  const [result] = await client.objectLocalization('./isabel.jpg');
  const objects = result.localizedObjectAnnotations;
  objects.forEach(object => console.log(object));
  console.log(objects.length);
  return objects;
}

//const getCropHints = async () => {
//  const [result] = await client.cropHints('./isabel.jpg');
//  const crops = result.cropHintsAnnotation;
  //crops.forEach(crop => console.log(crop));
//  console.log(crops.cropHints[0].boundingPoly);
//}

const test = async () => {
    const objects = await getObjects();
    console.log(JSON.stringify(objects));
}

test();