import { FirebaseOptions, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyCdBrj_xidBgg630meQ5nREzwfNSnRBkWU",
  authDomain: "rsl-ashoka.firebaseapp.com",
  projectId: "rsl-ashoka",
  storageBucket: "rsl-ashoka.appspot.com",
  messagingSenderId: "369638317070",
  appId: "1:369638317070:web:03c817ac4d6f81514e705f",
  databaseURL:
    "https://rsl-ashoka-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Database
// const auth = getAuth(app);
// const firestore = getFirestore(app);
const database = getDatabase(app);

export { database };

// export { auth, firestore, database };
