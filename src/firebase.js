import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwJ58uTNX4OIz86jVkCS3-CynDAHnKKZw",
  authDomain: "todo-list-183f2.firebaseapp.com",
  databaseURL: "https://todo-list-183f2.firebaseio.com",
  projectId: "todo-list-183f2",
  storageBucket: "todo-list-183f2.appspot.com",
  messagingSenderId: "1088987355861",
  appId: "1:1088987355861:web:679358088241185ef5e05c",
  measurementId: "G-37DE0VQK5C"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
