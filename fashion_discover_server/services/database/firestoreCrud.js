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

const saveFashionSet = async (fashionset) => {
    const fashionMetaRef = await db.collection('fashion_metadata');
    await fashionMetaRef.doc(fashionset.uuid).set(fashionset);
}

const fashionSetPreview = async (id) => {
  const fashionMetaRef = await db.collection('fashion_metadata').doc(id);
  const snapshot =  await fashionMetaRef.get();
  let snapshotData = snapshot.data();

  let fashionParts = [];

  let uniquePart = [];

  for (i=0;i < snapshotData.objects.length; i++) {
    if (!uniquePart.includes(snapshotData.objects[i].name)) {
      let part = {
        name: snapshotData.objects[i].name,
        file: snapshotData.objects[i].fashionPart
      }
      fashionParts.push(part);
      uniquePart.push(part.name);
    }
  }

  let result = {
    uuid: snapshotData.uuid,
    uploadfile: snapshotData.uploadfile,
    fashionParts: fashionParts
  }

  return result;

}

module.exports = {getAll, getDocument, saveFashionSet, fashionSetPreview}
