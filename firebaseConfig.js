import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCIMluCVTva8N5zm0YPqFeJBkBo_BBo4D0",
  authDomain: "taskops-2-0.firebaseapp.com",
  projectId: "taskops-2-0",
  storageBucket: "taskops-2-0.firebasestorage.app",
  messagingSenderId: "494225741399",
  appId: "1:494225741399:web:c91897f181aebdf3453512"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebas
const tasks = collection(db, "Tasks");
const teams = collection(db, "Teams");
const rounds = collection(db, "Rounds");

export { db, app, tasks, teams, rounds };
