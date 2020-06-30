import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: `"${process.env.REACT_APP_FIREBASE_API_KEY}"`,
  authDomain: "meetings-f5c51.firebaseapp.com",
  databaseURL: "https://meetings-f5c51.firebaseio.com",
  projectId: "meetings-f5c51",
  storageBucket: "meetings-f5c51.appspot.com",
  messagingSenderId: "835177145486",
  appId: "1:835177145486:web:5aa9bebe53cd34269115df",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const FacebookProvider = new firebase.auth.FacebookAuthProvider();
export const auth = firebase.auth();

export default firebase;
