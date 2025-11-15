const express = require('express');
const router = express.Router();

// ¡Aquí importamos nuestro "molde" de juegos!
const Game = require('../models/Game');

// --- RUTAS ---

/*
 * @route   POST api/games
 * @desc    Crear un nuevo juego en la biblioteca
 * @access  Public
 */
router.post('/', async (req, res) => {
  try {
    // 'req.body' contiene los datos que el frontend nos envía (ej: título, cover)
    const newGame = new Game({
      title: req.body.title,
      cover: req.body.cover,
      rating: req.body.rating,
      hoursPlayed: req.body.hoursPlayed,
      completed: req.body.completed
    });

    // Guardamos el juego nuevo en la base de datos
    const game = await newGame.save();

    // Respondemos al frontend con el juego que acabamos de crear
    res.json(game);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del Servidor');
  }
});

/*
 * @route   GET api/games
 * @desc    Obtener TODOS los juegos de la biblioteca
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Buscamos en la base de datos todos los juegos y los ordenamos por fecha
    const games = await Game.find().sort({ addedAt: -1 });
    
    // Respondemos con la lista de juegos
    res.json(games);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del Servidor');
  }
});

/*
 * @route   PUT api/games/:id
 * @desc    Actualizar un juego (ej: marcar como completado)
 * @access  Public
 */
router.put('/:id', async (req, res) => {
  try {
    // Busca el juego por su ID (que viene en la URL)
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({ msg: 'Juego no encontrado' });
    }

    // Actualizamos el juego con los datos que vengan en el body
    // 'new: true' hace que nos devuelva el juego actualizado
    const updatedGame = await Game.findByIdAndUpdate(
      req.params.id,
      req.body, // Le pasaremos { completed: true } o { completed: false }
      { new: true }
    );

    res.json(updatedGame); // Respondemos con el juego ya actualizado

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del Servidor');
  }
});

// Exportamos el 'router' para que nuestro index.js pueda usarlo
module.exports = router;

/*
 * @route   DELETE api/games/:id
 * @desc    Eliminar un juego de la biblioteca
 * @access  Public
 */
router.delete('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({ msg: 'Juego no encontrado' });
    }

    // Busca y elimina el juego por su ID
    await Game.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Juego eliminado correctamente' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del Servidor');
  }
});