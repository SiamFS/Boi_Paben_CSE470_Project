// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4mJg-Hu2Xi9RK86EoFt5s6yp_kZUODX8",
  authDomain: "mern-book-inventory-765aa.firebaseapp.com",
  projectId: "mern-book-inventory-765aa",
  storageBucket: "mern-book-inventory-765aa.appspot.com",
  messagingSenderId: "788530059359",
  appId: "1:788530059359:web:1596ea7745c09f956323ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;