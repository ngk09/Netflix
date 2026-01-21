// Inside firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // MUST IMPORT THIS

const firebaseConfig = {
  apiKey: "AIzaSyAQzLquOjnWnpv2BNAGPibJ6O3Ly5wflfw",
  authDomain: "netflix-6d200.firebaseapp.com",
  projectId: "netflix-6d200",
  storageBucket: "netflix-6d200.firebasestorage.app",
  messagingSenderId: "677224628135",
  appId: "1:677224628135:web:0781d39181ae9b30fa8082",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // MUST EXPORT THIS