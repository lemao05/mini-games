// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBTSTdXdHJrursx0PFNpE4C4fCxVPcxwVg',
  authDomain: 'kazik-3fa31.firebaseapp.com',
  projectId: 'kazik-3fa31',
  storageBucket: 'kazik-3fa31.appspot.com',
  messagingSenderId: '438911208745',
  appId: '1:438911208745:web:471e82570c1828406afb38',
  databaseURL:
    'https://kazik-3fa31-default-rtdb.europe-west1.firebasedatabase.app',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
