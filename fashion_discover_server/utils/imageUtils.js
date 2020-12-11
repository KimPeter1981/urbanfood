const sizeOf = require('image-size');
const sharp = require('sharp');
const {Storage} = require('@google-cloud/storage');

const url = require('url');
const https = require('https');

const gc = new Storage({
  keyFilename: './services/fashiondiscovery.json',
  projectId: 'fashion-discovery'
});

const fashionDiscoverBucket  = gc.bucket('fashion-discovery');

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
  let url = 'https://storage.googleapis.com/fashion-discovery/upload/' + file;
  let dimensions = await sizeOfImage(url);
  for (i=0;i < objectDetection.length;i++) {
    for (j=0;j < objectDetection[i].boundingPoly.normalizedVertices.length;j++) {
      let normalizedX = objectDetection[i].boundingPoly.normalizedVertices[j].x;
      let normalizedY = objectDetection[i].boundingPoly.normalizedVertices[j].y;
      objectDetection[i].boundingPoly.vertices.push({x: Math.round(normalizedX*dimensions.width), y: Math.round(normalizedY*dimensions.height)});
    }
  }
  return objectDetection;
}


const cutBoundyBox = (coordinates, uploadFile, output) => {
  return new Promise((resolve, reject) => {
    const inputFile = 'upload/' + uploadFile;
    const blobRead = fashionDiscoverBucket.file(inputFile);
    const readableStream = blobRead.createReadStream();
    const outputFile = 'fashion/' + output;
    const blobWrite = fashionDiscoverBucket.file(outputFile);
    const writableStream = blobWrite.createWriteStream();
    const extract = sharp().extract(coordinates).jpeg();
    readableStream.pipe(extract).pipe(writableStream);

    readableStream.on('end', () => {
      console.log('Crop ' + outputFile + ' created!');
      resolve(true);
    });
  })
}

const cutPictureParts = async (objectDetection, uploadfile) => {
  let objectWithVertices = await convertNormalizedVertices(objectDetection, uploadfile.uploadfile);
  let fashionParts = [];
  objectWithVertices.forEach(async (object) => {
    let width = object.boundingPoly.vertices[1].x - object.boundingPoly.vertices[0].x;
    let height =  object.boundingPoly.vertices[2].y - object.boundingPoly.vertices[0].y;
    let fashionpartfile = uploadfile.uuid + '_' + object.name + '.jpg';
    fashionParts.push(fashionpartfile);
    let coord = { left: object.boundingPoly.vertices[0].x, top: object.boundingPoly.vertices[0].y, width: width, height: height }
    await cutBoundyBox(coord, uploadfile.uploadfile, fashionpartfile);
  });
  return fashionParts;
}

module.exports = {cutPictureParts}
