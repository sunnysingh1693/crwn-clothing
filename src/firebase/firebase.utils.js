import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBaFfJ5vnf77i68YvkEmBvHbIlO5nCYOtw",
  authDomain: "crwn-db-e1e90.firebaseapp.com",
  projectId: "crwn-db-e1e90",
  storageBucket: "crwn-db-e1e90.appspot.com",
  messagingSenderId: "502176019687",
  appId: "1:502176019687:web:10ca74cfef34fe370ade42",
  measurementId: "G-BCMHJYKQ8W"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;