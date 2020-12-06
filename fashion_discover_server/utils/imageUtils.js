const sizeOf = require('image-size');
const sharp = require('sharp');
// const probe = require('probe-image-size');

var url = require('url');
var https = require('https');

// var imgUrl = 'https://storage.googleapis.com/fashion-discovery/upload/blue_mantel.jpg';

const sizeOfImage = async (imgUrl) => {
  var options = url.parse(imgUrl);
  return new Promise((resolve, reject) => {
      https.get(options, function (response) {
        var chunks = [];
        response.on('data', function (chunk) {
        chunks.push(chunk);
      }).on('end', function() {
        var buffer = Buffer.concat(chunks);
        let dimension = sizeOf(buffer);
        resolve(dimension);
      });
    });
  })
}

const convertNormalizedVertices = async (objectDetection, file) => {
  // let dimensions = sizeOf(file);
  let url = 'https://storage.googleapis.com/fashion-discovery/upload/' + file;
  // console.log(url);
  let dimensions = await sizeOfImage(url);
  // console.log(dimensions);
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
  // const uploadPath = './static/upload/' + uploadfile;
  const uploadPath = 'gs://fashion-discovery/upload/' + uploadfile;
  const fashionPath = 'gs://fashion-discovery/fashion/'
  // const fashionPath = './static/fashion/';
  console.log('uploadPath: ' + uploadPath);
  console.log('fashionPath: ' + fashionPath);
  // let objectWithVertices = convertNormalizedVertices(objectDetection, uploadPath);
  let objectWithVertices = await convertNormalizedVertices(objectDetection, uploadfile);
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
