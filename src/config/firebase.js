import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5wKrl3FCpP-vVYjdJaAud3Zwragwzua0",
  authDomain: "bionic-mercury-310921.firebaseapp.com",
  projectId: "bionic-mercury-310921",
  storageBucket: "bionic-mercury-310921.appspot.com",
  messagingSenderId: "891882286000",
  appId: "1:891882286000:web:b0a753caab02124ab64475",
  measurementId: "G-C0YF6DLQWX"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export {
  app,
  auth,
}
