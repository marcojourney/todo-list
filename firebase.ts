import firebase from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import 'firebase/database';

const firebaseConfig = {
  // Your Firebase configuration values
  // Retrieve these values from your Firebase project's settings
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  // ...
};

// Initialize Firebase
if (!firebase.getApps().length) {
  firebase.initializeApp(firebaseConfig);
}

export const app = firebase.initializeApp(firebaseConfig);