// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5N2nt3OWBJjeNdj9OwBlGyAwaa7B-Zt8",
  authDomain: "vite-gkom-nasa-apis.firebaseapp.com",
  projectId: "vite-gkom-nasa-apis",
  storageBucket: "vite-gkom-nasa-apis.appspot.com",
  messagingSenderId: "347509347503",
  appId: "1:347509347503:web:54f210bb9eec7ad8e4f05a",
  measurementId: "G-DB4ZEJMEL5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);