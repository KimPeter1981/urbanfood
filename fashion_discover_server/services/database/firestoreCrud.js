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

module.exports = {getAll, getDocument, saveFashionSet}
