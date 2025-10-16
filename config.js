// Configuration pour l'environnement
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  // Développement local
  window.API_BASE = 'http://localhost:3001/api';
} else {
  // Production Railway
  window.API_BASE = 'https://portfolio-architecte-sophie-bluel-production.up.railway.app/api';
}