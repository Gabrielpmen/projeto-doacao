
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFOX7rQ_6X3mTKw8TmZL3wajoH5Au82vQ",
  authDomain: "projeto-doacao-app.firebaseapp.com",
  projectId: "projeto-doacao-app",
  storageBucket: "projeto-doacao-app.firebasestorage.app",
  messagingSenderId: "27183707056",
  appId: "1:27183707056:web:6a60eab6fc7b2cb8c95c75"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);