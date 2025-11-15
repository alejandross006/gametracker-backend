const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 4000;

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- Ruta de prueba ---
app.get('/', (req, res) => {
  res.json({ message: '¡El backend de GameTracker funciona!' });
});
// --- Rutas de la API ---
app.use('/api/games', require('./routes/gameRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
// --- Función para Conectar DB y Arrancar Servidor ---
const startServer = async () => {
  try {
    // 1. Conectar a la base de datos
    await mongoose.connect(process.env.MONGO_URI);
    console.log('¡Base de datos conectada! (MongoDB Atlas)');
    
    // 2. Solo después de conectar la DB, encender el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });

  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    process.exit(1); // Detiene la app si no se puede conectar
  }
};

// --- Iniciar todo ---
startServer();