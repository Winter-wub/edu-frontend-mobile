import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import config from "../config.json";

export const firebaseApp = firebase.initializeApp(config.firebase);
export const firestore = firebaseApp.firestore();
export const auth = firebaseApp.auth();
