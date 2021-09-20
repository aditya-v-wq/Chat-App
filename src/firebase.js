import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp( {
    apiKey: "AIzaSyDHLG9g6i5r6cM0WtDrKCjsYmSGR7snHHk",
    authDomain: "chat-app-65989.firebaseapp.com",
    projectId: "chat-app-65989",
    storageBucket: "chat-app-65989.appspot.com",
    messagingSenderId: "15604470334",
    appId: "1:15604470334:web:c0a408675b00c9f53d776f"
  }).auth();