import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDYgFVR2DL7G8RhYMppKcS-s6qTUpk3oOQ",
  authDomain: "talky-20cc6.firebaseapp.com",
  projectId: "talky-20cc6",
  storageBucket: "talky-20cc6.appspot.com",
  messagingSenderId: "96822728439",
  appId: "1:96822728439:web:2ae498f90418c4f62965f2"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);