// firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyA5rlrZUYRYXTbXLDVXz7o1jSD1gl_Z07M",
  authDomain: "chisme-30b9d.firebaseapp.com",
  projectId: "chisme-30b9d",
  storageBucket: "chisme-30b9d.firebasestorage.app",
  messagingSenderId: "885129941623",
  appId: "1:885129941623:web:75cf6364ecd2b7710dec72",
  measurementId: "G-YNP0JB5HY9"

};


// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Función para monedas
function updateCoinDisplay(coins) {
  const coinElement = document.getElementById('userCoins');
  if(coinElement) {
    coinElement.innerHTML = `
      <span class="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
        ${coins} <span class="text-indigo-200">🪙</span>
      </span>
    `;
  }
}
