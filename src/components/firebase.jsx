import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMXLRYDQvau6Ue5n-S8nKK4WxnntYGPdw",
  authDomain: "task-manager-5d94a.firebaseapp.com",
  projectId: "task-manager-5d94a",
  storageBucket: "task-manager-5d94a.appspot.com",
  messagingSenderId: "873558526600",
  appId: "1:873558526600:web:9cec6ab8a0153fa510ed3d",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
