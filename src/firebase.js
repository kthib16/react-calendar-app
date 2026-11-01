import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// The web config identifies the Firebase project and is not a secret. Access is
// controlled by Firebase Authentication and Firestore security rules. The API key
// is read from the environment so each developer can use their own project.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'jsr-914-3a79b.firebaseapp.com',
  projectId: 'jsr-914-3a79b',
  storageBucket: 'jsr-914-3a79b.appspot.com',
  messagingSenderId: '573368560534',
  appId: '1:573368560534:web:5c4bb34ecb946546d20bb7',
};

const app = initializeApp(firebaseConfig);

// False until REACT_APP_FIREBASE_KEY is set (see .env.example). The app shows a
// setup message instead of crashing when it is missing.
export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey);

export const db = getFirestore(app);
export const auth = isFirebaseConfigured ? getAuth(app) : null;
