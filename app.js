const express = require('express');
const path = require('path');
const cors = require('cors')
require('dotenv').config();
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')
const swaggerDocs = yaml.load('swagger.yaml')
const app = express()

app.use(cors({
  origin: [
    'https://sophie-bluel-frontend.vercel.app',
    'https://portfolio-architecte-sophie-bluel-production.up.railway.app',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:5500',
    'http://127.0.0.1:5500' 
  ],
  credentials: true
}));
app.options('*', cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet({
      crossOriginResourcePolicy: false,
    }));
app.use('/images', express.static(path.join(__dirname, 'images')))

const db = require("./models");
const userRoutes = require('./routes/user.routes');
const categoriesRoutes = require('./routes/categories.routes');
const worksRoutes = require('./routes/works.routes');

// Initialisation de la base de données avec gestion d'erreur
db.sequelize.sync()
  .then(() => {
    console.log('✅ Database connection successful');
    console.log('✅ Database is ready');
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  });

app.use('/api/users', userRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/works', worksRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Route de santé pour vérifier que l'API fonctionne
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Gestion d'erreur globale
app.use((error, req, res, next) => {
  console.error('❌ Error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : error.message
  });
});

module.exports = app;