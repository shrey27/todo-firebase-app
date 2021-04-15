import firebase from "firebase/app";

import "firebase/firestore";

firebase.initializeApp( {
    apiKey: "AIzaSyAkEpciL9OaFwjcavCupnk8czguCnDn9O8",
    authDomain: "todo-firebase-app-90dff.firebaseapp.com",
    projectId: "todo-firebase-app-90dff",
    storageBucket: "todo-firebase-app-90dff.appspot.com",
    messagingSenderId: "191778831599",
    appId: "1:191778831599:web:f6a8e401373287b5d32f1a"
});

export const firestore = firebase.firestore();

export default firebase;