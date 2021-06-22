import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBaFfJ5vnf77i68YvkEmBvHbIlO5nCYOtw",
  authDomain: "crwn-db-e1e90.firebaseapp.com",
  // authDomain: "sunny-crwn-live.herokuapp.com",
  projectId: "crwn-db-e1e90",
  storageBucket: "crwn-db-e1e90.appspot.com",
  messagingSenderId: "502176019687",
  appId: "1:502176019687:web:10ca74cfef34fe370ade42",
  measurementId: "G-BCMHJYKQ8W",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  /* ".docs" property returns an array of our documents as documentSnapshot objects.
    The uid (User UID) is created when a new user is added.
    Here we're basically checking if the user exists. */
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  /* We get the snapshotObject from the referenceObject using the .get() method.
    We will get this object even if the user does not exist. */
  const snapShot = await userRef.get();

  // If user data doesn't exist DB, create it
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // .set() creates a user doc
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj); // It's like "key: value" pair
  });

  return await batch.commit(); // "commit()" will return a promise, so we need to await it. We can return the promise to handle error or perform some other actions
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(docSnapshot => {
    /* Maps through all the collections from Firestore & add routeName and id to each doc. */
    const { title, items } = docSnapshot.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: docSnapshot.id,
      title,
      items
    }
  })

  return transformedCollection.reduce((accumulator, collection) => {
    /* sets accumulator = { title: {collection}, ... } */
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
