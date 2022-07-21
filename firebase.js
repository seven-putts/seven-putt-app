import firebase from "firebase";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBAu54hoaZAaaOaFbBbQH6q1cJOiPd3xp0",
  authDomain: "clone-aed47.firebaseapp.com",
  databaseURL: "https://clone-aed47.firebaseio.com",
  projectId: "clone-aed47",
  storageBucket: "clone-aed47.appspot.com",
  messagingSenderId: "360731163578",
  appId: "1:360731163578:web:e2def14c27a23f75c57b83",
  measurementId: "G-SSRXTKRZ84",
};

let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
} else {
  Firebase = firebase.app();
}

export const provider = new firebase.auth.GoogleAuthProvider();

export default Firebase;
