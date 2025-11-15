const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

/*
 * @route   POST api/reviews/:gameId
 * @desc    Crear una nueva reseña para un juego específico
 */
router.post('/:gameId', async (req, res) => {
  try {
    const newReview = new Review({
      comment: req.body.comment,
      game: req.params.gameId // Obtenemos el ID del juego desde la URL
    });

    const review = await newReview.save();
    res.json(review);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del Servidor');
  }
});

/*
 * @route   GET api/reviews/:gameId
 * @desc    Obtener todas las reseñas de un juego específico
 */
router.get('/:gameId', async (req, res) => {
  try {
    const reviews = await Review.find({ game: req.params.gameId })
      .sort({ createdAt: -1 }); // Muestra las más nuevas primero
    
    res.json(reviews);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del Servidor');
  }
});

module.exports = router;