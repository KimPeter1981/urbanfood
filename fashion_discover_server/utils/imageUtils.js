const sizeOf = require('image-size');
const sharp = require('sharp');
// const {test} = require('./test');

const testFile = '../services/isabel.jpg';

const convertNormalizedVertices = (objectDetection) => {
  let dimensions = sizeOf(testFile);
  for (i=0;i < objectDetection.length;i++) {
    for (j=0;j < objectDetection[i].boundingPoly.normalizedVertices.length;j++) {
      let normalizedX = objectDetection[i].boundingPoly.normalizedVertices[j].x;
      let normalizedY = objectDetection[i].boundingPoly.normalizedVertices[j].y;
      objectDetection[i].boundingPoly.vertices.push({x: Math.round(normalizedX*dimensions.width), y: Math.round(normalizedY*dimensions.height)});
    }
  }
  return objectDetection;
}

const cutPictureParts = async (objectDetection) => {
  let objectWithVertices = convertNormalizedVertices(objectDetection);
  let i = 0;
  objectWithVertices.forEach(async (object) => {
    let width = object.boundingPoly.vertices[1].x - object.boundingPoly.vertices[0].x;
    let height =  object.boundingPoly.vertices[2].y - object.boundingPoly.vertices[0].y;
    let outputPath = object.name + Date.now() +  ".jpg";
    await  sharp(testFile).extract({ left: object.boundingPoly.vertices[0].x, top: object.boundingPoly.vertices[0].y, width: width, height: height }).toFile(outputPath);
  });
}

module.exports = {cutPictureParts}
