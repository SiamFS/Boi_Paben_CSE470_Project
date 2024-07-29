import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC4mJg-Hu2Xi9RK86EoFt5s6yp_kZUODX8",
  authDomain: "mern-book-inventory-765aa.firebaseapp.com",
  projectId: "mern-book-inventory-765aa",
  storageBucket: "mern-book-inventory-765aa.appspot.com",
  messagingSenderId: "788530059359",
  appId: "1:788530059359:web:1596ea7745c09f956323ea"
};

const app = initializeApp(firebaseConfig);

export default app;
