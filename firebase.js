// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
//import { getAuth, onAuthStateChanged } from "firebase/auth";
//import { initializeApp } from "firebase/app";
//import firebase from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkmrvCuXvs5kJkZ6qS6R5LlWiJPnnl1FY",
  authDomain: "fleaapp-92a4d.firebaseapp.com",
  projectId: "fleaapp-92a4d",
  storageBucket: "fleaapp-92a4d.appspot.com",
  messagingSenderId: "496631521542",
  appId: "1:496631521542:web:13d9431c775bf120103e87"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}
const auth = firebase.auth()

export {auth};