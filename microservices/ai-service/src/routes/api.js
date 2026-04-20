const express = require('express');
const router = express.Router();

const embeddingController = require('../controllers/embeddingController');

// Ruta para el motor de embedding 
router.post('/embedding-engine', embeddingController.createEmbedding);


module.exports = router;