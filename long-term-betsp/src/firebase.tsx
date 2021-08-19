import firebase from "firebase/app";
import "firebase/app";
import "firebase/database";

const config = {
  apiKey: "AIzaSyDMsXsJTbSS24dHPQ7SmshoCY50iygfp6E",
  authDomain: "long-term-bets-85159.firebaseapp.com",
  projectId: "long-term-bets-85159",
  storageBucket: "long-term-bets-85159.appspot.com",
  messagingSenderId: "291408210715",
  appId: "1:291408210715:web:482e0c86dc1c6aced941be",
  measurementId: "G-X9QZ9D3LCF",
};

// Initialize Firebase
firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref("matches");

export { firebase, firebaseMatches };
