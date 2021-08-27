import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const settings = { timestampsInSnapshots: true };

const app = firebase.initializeApp({
  apiKey: "AIzaSyDp75dGgj-VJul28kUM3aNYtKYdrm28oaQ",
  authDomain: "check-list-development.firebaseapp.com",
  databaseURL: "https://check-list-development-default-rtdb.firebaseio.com",
  projectId: "check-list-development",
  storageBucket: "check-list-development.appspot.com",
  messagingSenderId: "683689026143",
  appId: "1:683689026143:web:e7d5d846483a5f75d271ea",
});

firebase.firestore().settings(settings);

export default app;
