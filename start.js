#!/usr/bin/env node

// Script de démarrage optimisé pour Railway
console.log('🚀 Starting Sophie Bluel Backend...');
console.log('Environment:', process.env.NODE_ENV || 'development');
console.log('Port:', process.env.PORT || 'undefined');
console.log('Working directory:', process.cwd());
console.log('Node version:', process.version);

// Vérification des variables d'environnement critiques
if (!process.env.NODE_ENV) {
  console.log('⚠️  NODE_ENV not set, defaulting to production');
  process.env.NODE_ENV = 'production';
}

if (!process.env.PORT) {
  console.log('⚠️  PORT not set by Railway, this might cause issues');
}

// Vérifier que les fichiers nécessaires existent
const fs = require('fs');
const path = require('path');

const requiredFiles = ['server.js', 'app.js', 'package.json'];
requiredFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    console.log(`✅ ${file} found`);
  } else {
    console.log(`❌ ${file} not found`);
  }
});

console.log('📁 Backend directory contents:');
try {
  const files = fs.readdirSync(__dirname);
  files.forEach(file => console.log(`  - ${file}`));
} catch (err) {
  console.log('❌ Cannot read directory:', err.message);
}

// Démarrage du serveur
try {
  console.log('🔄 Loading server.js...');
  require('./server.js');
} catch (error) {
  console.error('❌ Error starting server:', error);
  process.exit(1);
}
