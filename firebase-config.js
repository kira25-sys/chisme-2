// firebase-config.js
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROYECTO",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
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
