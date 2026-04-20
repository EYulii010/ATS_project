const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');

// --- Rutas protegidas de descripción de trabajo ---

// Proteger todas las rutas de este archivo con autenticación
router.use(authMiddleware);

/**
 * @route   POST /api/v1/jobs/generate-description
 * @desc    Genera una descripción de trabajo completa basada en un título y una URL de cultura empresarial.
 * @access  Privado (Requiere JWT)
 */
router.post('/generate-description', jobController.generateJobDescription);

module.exports = router;
