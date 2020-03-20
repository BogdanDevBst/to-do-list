import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABXjLV6bPpeT4hThJS7_CwaBwJkqXpBsA",
  authDomain: "to-do-list-da60f.firebaseapp.com",
  databaseURL: "https://to-do-list-da60f.firebaseio.com",
  projectId: "to-do-list-da60f",
  storageBucket: "to-do-list-da60f.appspot.com",
  messagingSenderId: "770511006825",
  appId: "1:770511006825:web:e51651d10b5e6b9488c6f8",
  measurementId: "G-R28TQNH49P"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
