import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDcjPcbrTzubivRWjdqsVJ5q7rOQFdV5Oc",
  authDomain: "sprint3-movies.firebaseapp.com",
  projectId: "sprint3-movies",
  storageBucket: "sprint3-movies.appspot.com",
  messagingSenderId: "908926882126",
  appId: "1:908926882126:web:53818ae7c00f5a34958e1f"
};


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
var provider = new firebase.auth.FacebookAuthProvider();


export {
    db,
    googleAuthProvider,
    provider,
    firebase
}

