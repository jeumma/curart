import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCOaQ7SykJefmSNLSuAqgEBxG2F3KEfe68",
    authDomain: "curart-cdaf2.firebaseapp.com",
    projectId: "curart-cdaf2",
    storageBucket: "curart-cdaf2.firebasestorage.app",
    messagingSenderId: "428052296793",
    appId: "1:428052296793:web:03010ad117c56a23356d48",
    measurementId: "G-MDVY0QE4Z7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);