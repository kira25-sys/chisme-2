import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA5rlrZUYRYXTbXLDVXz7o1jSD1gl_Z07M",
  authDomain: "chisme-30b9d.firebaseapp.com",
  projectId: "chisme-30b9d",
  storageBucket: "chisme-30b9d.firebasestorage.app",
  messagingSenderId: "885129941623",
  appId: "1:885129941623:web:75cf6364ecd2b7710dec72",
};


// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Exporta o asigna a variables globales (si las necesitas en otras partes)
const db = firebase.firestore();
const auth = firebase.auth();

// Opcional: si quieres una referencia al storage, etc.
// const storage = firebase.storage();
