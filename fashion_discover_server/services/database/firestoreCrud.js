const Firestore = require('@google-cloud/firestore');
const { v4: uuidv4 } = require('uuid');

const db = new Firestore({
  projectId: 'fashion-discovery',
  keyFilename: './services/fashiondiscovery.json'
});

const getAll = async () => {
    const fashionMetaRef = await db.collection('fashion_metadata');
    const snapshot = await fashionMetaRef.get();
    let result = [];
    snapshot.forEach(doc => {
      result.push(doc.data());
    });
    return result;
}

const getDocument = async (id) => {
    const fashionMetaRef = await db.collection('fashion_metadata').doc(id);
    const snapshot =  await fashionMetaRef.get();
    return snapshot.data();
}

const reduce = (imgextract) => {
  map = new Map()

  imgextract.objects.forEach(element => {
      if (map.get(element.name)) {
          let fashionParts = map.get(element.name)
          fashionParts.push({name: element.fashionPart, score: element.score})
          map.set(element.name, fashionParts)
      } else {
          let fashionParts = [{name: element.fashionPart, score: element.score}]
          map.set(element.name, fashionParts)
      }
  });

  let fashionSet = []

  for (var key of map.keys()) {
      fashionSet.push({name: key, fashionFiles: map.get(key)})
  }

  let labels = []

  imgextract.labels.forEach(element => {
    labels.push({name: element.description, score: element.score})
  })  

  let fashionObj = {
      uploadfile: imgextract.uploadfile,
      uuid: imgextract.uuid,
      fashionSet: fashionSet,
      labels: labels
  }

  return fashionObj;
}

const saveFashionSet = async (fashionset) => {
    let reducedFashionSet = reduce(fashionset);
    const fashionMetaRef = await db.collection('fashion_metadata');
    await fashionMetaRef.doc(fashionset.uuid).set(reducedFashionSet);
}

const save = async (fashion) => {
  const fashionMetaRef = await db.collection('fashion_metadata');
  await fashionMetaRef.doc(fashion.uuid).set(fashion);
}

const saveDetails = async (fashionDetails) => {
  const fashionMetaRef = await db.collection('fashion_pieces');
  let uuid = uuidv4();
  await fashionMetaRef.doc(uuid).set(fashionDetails);
  let fashionMetaData = await fashionSetPreview(fashionDetails.uuid_meta);
  let indexSearchFun = (element) => element.name === fashionDetails.part;
  let searchIndex = fashionMetaData.fashionSet.findIndex(indexSearchFun);
  fashionMetaData.fashionSet[searchIndex].uuid_piece = uuid;
  save(fashionMetaData); 
  console.log('---save details finish--');
}

const fashionSetPreview = async (id) => {
  const fashionMetaRef = await db.collection('fashion_metadata').doc(id);
  const snapshot =  await fashionMetaRef.get();
  let snapshotData = snapshot.data();
  return snapshotData;
}

let excludes = ['Art','Insect','Soil','Lip','Hairstyle','Photograph','Eyelash','Neck', 'Electric blue', 'Rectangle','Vision care',
                'Natural material', 'Joint', 'Outerwear', 'Shoulder', 'Fashion', 'Textile','Waist', 'Thigh','Arm','Gesture','Style',
                'Finger','Model','Street fashion','Knee','Standing','Product','Holding hands','Peach','Ivory','Wrist','Elbow','Finger',
                'Photo shoot','Fashion design','Fashion model','Foot','Beauty','Snapshot','Room','Monochrome photography','Human leg',
                'Eyewear','Chest','Black hair','Hair','Flash photography','Long hair','Floor','Asphalt','Road surface','Flooring','Leg',
                'Mouth','Holiday','Smile','Christmas tree','Christmas ornament','Holiday ornament','Christmas eve','Christmas']

const excludeInfos = (labels) => {
  let includes = [];
  labels.forEach(label => {
    if (excludes.findIndex(exclude => exclude === label.name) === -1) {
      includes.push(label)
    }
  });
  return includes;
}

const mergeLabels = (fashion, piece) => {
  piece[0].labels = piece[0].labels.concat(fashion.labels)
  piece[0].labels = Array.from(new Set(piece[0].labels))
  piece[0].labels = excludeInfos(piece[0].labels);
  return piece;
}

const getFashionPart = (fashion, part) => {
  let piece = fashion.fashionSet.filter(p => p.name === part);
  piece = mergeLabels(fashion, piece);
  return piece;
}

const getFashionPiece = async (id) => {
  const fashionPieceRef = await db.collection('fashion_pieces').doc(id);
  // const snapshotPiece =  await fashionPieceRef.where('part', '==', piece).get();
  const snapshotPiece =  await fashionPieceRef.get();
  return snapshotPiece.data();
}

const getFashionPieceData = async (id, piece) => {
  const fashionPieceRef = await db.collection('fashion_pieces');
  const snapshotPiece = await fashionPieceRef.where('uuid_meta', '==', id).get();
  let allPieces = [];
  snapshotPiece.forEach(doc => {
    allPieces.push(doc.data());
  });
  const filterPieces = allPieces.filter((element) => element.part === piece);
  return filterPieces;
}

// getFashionPieceData('6e9b25a2-d1b0-45be-9fc7-9cac46307407', 'Shoe');

const fashionMetaData = async (id , part) => {
  const fashionMetaRef = await db.collection('fashion_metadata').doc(id);
  const snapshot =  await fashionMetaRef.get();
  let snapshotData = snapshot.data();
  let filteredSnapshot = snapshotData.fashionSet.filter((obj) => obj.name === part);
  if (filteredSnapshot.length > 0) {
    return filteredSnapshot[0];
  } else {
    return []
  }
}

const addDescription = async (obj) => {
  let fashion = await fashionSetPreview(obj.uuid);
  indexPiece = fashion.fashionSet.findIndex((p) => p.name === obj.piece);
  fashion.fashionSet[indexPiece].description = obj.description;
  save(fashion);
}

const getPieces = async (startId) => {
  console.log('getAllPieces');
  //let documentList = await db.collection("fashion_pieces").orderBy('uuid').startAfter('96bfcaa1-8d14-48f7-bdb4-9bceeb061a7d').get();
  let documentList = await db.collection("fashion_pieces").orderBy('uuid').startAfter(startId).limit(2).get();
  let docArray = [];
  documentList.forEach(doc => {
    // console.log(doc.id, '=>', doc.data());
    docArray.push(doc.data())
  });

  return {
    pieces: docArray
  }
}

// getAllPieces();

module.exports = {getAll, getDocument, 
                saveFashionSet, fashionSetPreview, 
                fashionMetaData, save, 
                getFashionPiece, 
                addDescription, saveDetails, getPieces, getFashionPieceData}
