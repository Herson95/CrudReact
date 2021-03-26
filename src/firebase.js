import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDLh6Wvraj9V8dEA3MgtkpW13fF7BfBVC8",
    authDomain: "crud-cb81f.firebaseapp.com",
    projectId: "crud-cb81f",
    storageBucket: "crud-cb81f.appspot.com",
    messagingSenderId: "837117098565",
    appId: "1:837117098565:web:53b6360f1fa6602e43812c"
  }

export const firebaseApp = firebase.initializeApp(firebaseConfig)