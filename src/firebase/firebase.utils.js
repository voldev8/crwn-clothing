import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDF0I3pzBUkSZUF0qTX0-eU2pOf8uQkEU0",
  authDomain: "crwn-db-4baa3.firebaseapp.com",
  databaseURL: "https://crwn-db-4baa3.firebaseio.com",
  projectId: "crwn-db-4baa3",
  storageBucket: "crwn-db-4baa3.appspot.com",
  messagingSenderId: "354974133784",
  appId: "1:354974133784:web:45e6ab9668fd4cc0f99d6d",
  measurementId: "G-ZV9C946LZS"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  
  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

