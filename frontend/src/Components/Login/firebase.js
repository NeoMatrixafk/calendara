import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app); // Pass the app instance to getAuth

export { auth };
