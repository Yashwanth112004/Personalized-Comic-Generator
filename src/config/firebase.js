import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC18tEaCRGdLcazYrOV-hOTh5xMOk9xGqs",
    authDomain: "sample-app-26111.firebaseapp.com",
    projectId: "sample-app-26111",
    storageBucket: "sample-app-26111.appspot.com",
    messagingSenderId: "868442822428",
    appId: "1:868442822428:web:99c12bd61c8668c4204cd9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };