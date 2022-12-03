import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";
import {getAnalytics} from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyC-l47BDyXoRhXRrB7SIFRnU9DB2P_ts-I",
  authDomain: "webify3-f900d.firebaseapp.com",
  projectId: "webify3-f900d",
  storageBucket: "webify3-f900d.appspot.com",
  messagingSenderId: "943337318286",
  appId: "1:943337318286:web:fa62b3baca6f8d153026df",
  measurementId: "G-3PJK5CKWKG",
};


const app           = initializeApp(firebaseConfig);
const analytics     = getAnalytics(app);
const databaseFire  = getDatabase(app,"https://webify3-f900d-default-rtdb.europe-west1.firebasedatabase.app");

export default databaseFire


