#!/bin/bash

# Script pour préparer le déploiement Railway
echo "🚀 Préparation du déploiement Railway..."

# Copier les fichiers essentiels du Backend vers la racine
echo "📁 Copie des fichiers Backend vers la racine..."

# Copier package.json
cp Backend/package.json ./backend-package.json

# Copier les fichiers principaux
cp Backend/server.js ./server.js
cp Backend/app.js ./app.js
cp Backend/start.js ./start.js

# Copier le dossier models
cp -r Backend/models ./models

# Copier le dossier controllers
cp -r Backend/controllers ./controllers

# Copier le dossier routes
cp -r Backend/routes ./routes

# Copier le dossier middlewares
cp -r Backend/middlewares ./middlewares

# Copier le dossier config
cp -r Backend/config ./config

# Copier les images
cp -r Backend/images ./images

# Copier la base de données
cp Backend/database.sqlite ./database.sqlite

# Copier swagger
cp Backend/swagger.yaml ./swagger.yaml

echo "✅ Fichiers copiés avec succès!"
echo "🎯 Railway va maintenant pouvoir trouver l'application à la racine"
