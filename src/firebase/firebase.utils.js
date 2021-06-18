import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBaFfJ5vnf77i68YvkEmBvHbIlO5nCYOtw",
  authDomain: "sunny-crwn-live.herokuapp.com",
  projectId: "crwn-db-e1e90",
  storageBucket: "crwn-db-e1e90.appspot.com",
  messagingSenderId: "502176019687",
  appId: "1:502176019687:web:10ca74cfef34fe370ade42",
  measurementId: "G-BCMHJYKQ8W",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // .docs property returns an array of our documents as documentSnapshot objects.
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // We get the snapshotObject from the referenceObject using the .get() method.
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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
