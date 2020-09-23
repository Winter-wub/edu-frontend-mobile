import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import config from "../config.json";
import { YellowBox, Platform } from "react-native";
export const firebaseApp = firebase.initializeApp(config.firebase);
export const firestore = firebaseApp.firestore();
export const auth = firebaseApp.auth();

if (process.env.NODE_ENV === "development") {
  if (Platform.OS === "android") {
    firestore.settings({
      host: "10.0.2.2:8080",
      ssl: false,
    });
  } else {
    firestore.settings({
      host: "localhost:8080",
      ssl: false,
    });
  }

  YellowBox.ignoreWarnings(["Setting a timer"]);
  const _console = { ...console };
  console.warn = (message) => {
    if (message.indexOf("Setting a timer") <= -1) {
      _console.warn(message);
    }
  };
}
