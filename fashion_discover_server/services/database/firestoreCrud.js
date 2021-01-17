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

  let fashionObj = {
      uploadfile: imgextract.uploadfile,
      uuid: imgextract.uuid,
      fashionSet: fashionSet
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

module.exports = {getAll, getDocument, saveFashionSet, fashionSetPreview, fashionMetaData, save}
