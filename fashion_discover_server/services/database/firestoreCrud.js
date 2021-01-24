const Firestore = require('@google-cloud/firestore');

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
          fashionParts.push(element.fashionPart)
          map.set(element.name, fashionParts)
      } else {
          let fashionParts = [element.fashionPart]
          map.set(element.name, fashionParts)
      }
  });

  let fashionSet = []

  for (var key of map.keys()) {
      fashionSet.push({name: key, fashionFiles: map.get(key)})
  }

  let labels = []

  imgextract.labels.forEach(element => {
    labels.push(element.description)
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
                'Mouth']

const excludeInfos = (labels) => {
  let includes = [];
  labels.forEach(label => {
    if (excludes.findIndex(exclude => exclude === label) === -1) {
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

const getFashionPiece = async (id, piece) => {
  let fashion = await fashionSetPreview(id);
  let fashionPiece = getFashionPart(fashion, piece);
  fashionPiece[0].uploadfile = fashion.uploadfile;
  return fashionPiece;
}

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

const obj = {
  uuid: '54067daf-c627-4230-a152-8bebc4572584',
  piece: 'Bag',
  description: 'Das ist eine schöne Tasche!!'
}

const addDescription = async (obj) => {
  let fashion = await fashionSetPreview(obj.uuid);
  indexPiece = fashion.fashionSet.findIndex((p) => p.name === obj.piece);
  fashion.fashionSet[indexPiece].description = obj.description;
  save(fashion);
}

module.exports = {getAll, getDocument, saveFashionSet, fashionSetPreview, fashionMetaData, save, getFashionPiece, addDescription}
