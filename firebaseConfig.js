import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAYaRWUoqlFPtv191f-ty9igrdJLTzKSmQ",
  authDomain: "taskops3-1abdb.firebaseapp.com",
  projectId: "taskops3-1abdb",
  storageBucket: "taskops3-1abdb.firebasestorage.app",
  messagingSenderId: "729787173817",
  appId: "1:729787173817:web:c4ee02ac51c581e0cfc468",
  measurementId: "G-BYTG5XY6WW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebas
const tasks = collection(db, "Tasks");
const teams = collection(db, "Teams");
const rounds = collection(db, "Rounds");

export { db, app, tasks, teams, rounds };
