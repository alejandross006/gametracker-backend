const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  // El texto de la reseña
  comment: {
    type: String,
    required: true
  },
  // La parte MÁS importante:
  // Guardamos una referencia al 'Game' al que pertenece esta reseña.
  game: {
    type: Schema.Types.ObjectId,
    ref: 'Game', // Esto le dice a Mongoose que se conecta con el modelo 'Game'
    required: true
  },
  // La fecha de creación
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Review', ReviewSchema);