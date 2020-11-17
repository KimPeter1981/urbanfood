const sizeOf = require('image-size');
const sharp = require('sharp');
// const {test} = require('./test');

//const testFile = '../services/isabel.jpg';

const convertNormalizedVertices = (objectDetection, file) => {
  let dimensions = sizeOf(file);
  for (i=0;i < objectDetection.length;i++) {
    for (j=0;j < objectDetection[i].boundingPoly.normalizedVertices.length;j++) {
      let normalizedX = objectDetection[i].boundingPoly.normalizedVertices[j].x;
      let normalizedY = objectDetection[i].boundingPoly.normalizedVertices[j].y;
      objectDetection[i].boundingPoly.vertices.push({x: Math.round(normalizedX*dimensions.width), y: Math.round(normalizedY*dimensions.height)});
    }
  }
  return objectDetection;
}

const cutPictureParts = async (objectDetection, uploadfile) => {
  const uploadPath = './static/upload/' + uploadfile;
  const fashionPath = './static/fashion/'
  let objectWithVertices = convertNormalizedVertices(objectDetection, uploadPath);
  let i = 0;
  let fashionParts = [];
  objectWithVertices.forEach(async (object) => {
    let width = object.boundingPoly.vertices[1].x - object.boundingPoly.vertices[0].x;
    let height =  object.boundingPoly.vertices[2].y - object.boundingPoly.vertices[0].y;
    let fashionpartfile = object.name + Date.now() +  ".jpg";
    let outputPath = fashionPath + fashionpartfile;
    fashionParts.push(fashionpartfile);
    await  sharp(uploadPath).extract({ left: object.boundingPoly.vertices[0].x, top: object.boundingPoly.vertices[0].y, width: width, height: height }).toFile(outputPath);
  });
  return fashionParts;
}

module.exports = {cutPictureParts}
