#!/usr/bin/env node

// Script de démarrage optimisé pour Railway
console.log('🚀 Starting Sophie Bluel Backend...');
console.log('Environment:', process.env.NODE_ENV || 'development');
console.log('Port:', process.env.PORT || '5678');

// Vérification des variables d'environnement critiques
if (!process.env.NODE_ENV) {
  console.log('⚠️  NODE_ENV not set, defaulting to development');
  process.env.NODE_ENV = 'development';
}

if (!process.env.PORT) {
  console.log('⚠️  PORT not set by Railway, this might cause issues');
}

// Démarrage du serveur
require('./server.js');
