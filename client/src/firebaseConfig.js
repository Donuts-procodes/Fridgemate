// Importing necessary Firebase services
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Firestore database
import { getDatabase } from 'firebase/database'; // Real-time database (if needed)

const firebaseConfig = {
  apiKey: "AIzaSyAVrPNik0YbEgv9ieupCCMow_lEFhSlBXg",
  authDomain: "fridgemate2025.firebaseapp.com",
  projectId: "fridgemate2025",
  storageBucket: "fridgemate2025.firebasestorage.app",
  messagingSenderId: "400887067624",
  appId: "1:400887067624:web:26eaa7f95428f8701e2a5d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const googleProvider = new GoogleAuthProvider(); // Google sign-in provider

// Export the necessary services
export { auth, firestore, googleProvider, firebaseApp };