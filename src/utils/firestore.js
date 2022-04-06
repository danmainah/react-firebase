import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyADikX-eWaMMP8xd6JCjFiL8KyJegk3_u0",
    authDomain: "task-manager-2da3e.firebaseapp.com",
    projectId: "task-manager-2da3e",
    storageBucket: "task-manager-2da3e.appspot.com",
    messagingSenderId: "73859373337",
    appId: "1:73859373337:web:5e255658d70ed8d542cd88",
    measurementId: "G-4ZXQ83SHKY"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export { db };