// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA5rlrZUYRYXTbXLDVXz7o1jSD1gl_Z07M",
  authDomain: "chisme-30b9d.firebaseapp.com",
  projectId: "chisme-30b9d",
  storageBucket: "chisme-30b9d.firebasestorage.app",
  messagingSenderId: "885129941623",
  appId: "1:885129941623:web:75cf6364ecd2b7710dec72",
  measurementId: "G-YNP0JB5HY9"
};

// Inicializar Firebase solo si no está ya inicializado
if (!firebase.apps.length) {
  try {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase inicializado correctamente");
  } catch (error) {
    console.error("Error inicializando Firebase:", error);
  }
} else {
  console.log("Firebase ya está inicializado");
}

// Exportar servicios de Firebase
const auth = firebase.auth();
const db = firebase.firestore();

// Hacer disponible en ámbito global
window.auth = auth;
window.db = db;

// Función para actualizar la visualización de monedas
window.updateCoinDisplay = (coins) => {
  const coinElement = document.getElementById('userCoins');
  if (coinElement) {
    coinElement.innerHTML = `
      <span class="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
        ${coins} <span class="text-indigo-200">🪙</span>
      </span>
    `;
  } else {
    console.warn("Elemento 'userCoins' no encontrado en el DOM.");
  }
};
