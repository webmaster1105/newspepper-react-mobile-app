// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFUJpS1aWb6yUH2xbf6j9-tQQecjIyunE",
  authDomain: "simplest-invoice.firebaseapp.com",
  databaseURL: "https://simplest-invoice.firebaseio.com",
  projectId: "simplest-invoice",
  storageBucket: "simplest-invoice.firebasestorage.app",
  messagingSenderId: "78038640256",
  appId: "1:78038640256:web:59c4240e8b47478f51e865",
  measurementId: "G-TVKRK9QP2M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = initializeAuth(app,{
  persistence: getReactNativePersistence(AsyncStorage),
}) 

    // const auth = getAuth(app);
    // export { auth };
