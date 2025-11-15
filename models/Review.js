const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  // El texto de la reseña
  comment: {
    type: String,
    required: true
  },

  game: {
    type: Schema.Types.ObjectId,
    ref: 'Game', 
    required: true
  },
  // La fecha de creación
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Review', ReviewSchema);
