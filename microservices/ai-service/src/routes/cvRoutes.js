const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cvController');
const authMiddleware = require('../middleware/authMiddleware'); // Import the auth middleware

// --- Rutas protegidas de procesamiento de CV ---

// Aplicar el middleware de autenticación a todas las rutas de este archivo.
// Cada solicitud a /ingest-cv ahora requerirá un JWT válido.
router.use(authMiddleware);

/**
 * @route   POST /api/v1/cv/ingest-cv
 * @desc    Recibe texto de CV crudo, lo procesa con IA y almacena el JSON estructurado.
 * @access  Privado (Requiere JWT)
 */
router.post('/ingest-cv', cvController.ingestCvText);

module.exports = router;
