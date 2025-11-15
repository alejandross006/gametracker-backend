const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Este es el "molde" para cada juego en la base de datos
const GameSchema = new Schema({
  // Título del juego (texto y es obligatorio)
  title: {
    type: String,
    required: true
  },
  // URL de la imagen de portada (texto y es obligatorio)
  cover: {
    type: String,
    required: true
  },
  // Si está completado o no (verdadero/falso)
  completed: {
    type: Boolean,
    default: false // Por defecto, un juego no está completado
  },
  // Puntuación de 1 a 5 estrellas
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 1 // Por defecto, una estrella
  },
  // Horas jugadas
  hoursPlayed: {
    type: Number,
    default: 0
  },
  // Fecha en que se agregó a la biblioteca
  addedAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Game', GameSchema);