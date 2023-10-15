// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrZg25MWbIW4Rn1DjgRaNpriGbwKaosQY",
  authDomain: "rockyplaywithrtdb.firebaseapp.com",
  projectId: "rockyplaywithrtdb",
  storageBucket: "rockyplaywithrtdb.appspot.com",
  messagingSenderId: "99414608099",
  appId: "1:99414608099:web:c8f39b16be327fc877ddd6",
  databaseURL: "https://rockyplaywithrtdb-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);