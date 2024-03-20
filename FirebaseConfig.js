// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCMPrhCcijXGdUFaBM3R8ThCp4DgW8Jjdg",
//   authDomain: "tourapp-dddd5.firebaseapp.com",
//   projectId: "tourapp-dddd5",
//   storageBucket: "tourapp-dddd5.appspot.com",
//   messagingSenderId: "992825310539",
//   appId: "1:992825310539:web:04ba824c2b714ddd52fcce",
//   measurementId: "G-8BSXFN71TN"
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);


// Import the functions you need from the SDKs you need
import { GoogleAuthProvider, getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKODnBfg9S2Cydnz-yRFyJuCkM0OS5Daw",
  authDomain: "arlocation-f4ab2.firebaseapp.com",
  projectId: "arlocation-f4ab2",
  storageBucket: "arlocation-f4ab2.appspot.com",
  messagingSenderId: "353570558425",
  appId: "1:353570558425:web:604ffd1d745d38afd949c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore();


export { app, auth, provider, db };