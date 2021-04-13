import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";

firebase.initializeApp( {
    apiKey: "AIzaSyAkEpciL9OaFwjcavCupnk8czguCnDn9O8",
    authDomain: "todo-firebase-app-90dff.firebaseapp.com",
    projectId: "todo-firebase-app-90dff",
    storageBucket: "todo-firebase-app-90dff.appspot.com",
    messagingSenderId: "191778831599",
    appId: "1:191778831599:web:f6a8e401373287b5d32f1a"
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();

// if (window.location.hostname.includes("localhost")) {
//   auth.useEmulator("http://localhost:9099");
//   firestore.useEmulator("localhost", 8080);
//   functions.useEmulator("localhost", 5001);
// }

export default firebase;
