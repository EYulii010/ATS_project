const express = require('express');
const router = express.Router();
const { analyzeMatch } = require('../controllers/matchAnalysisController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/v1/match-analysis
// @desc    Analiza solicitantes contra una descripción de trabajo
// @access  Privado
router.post('/', protect, analyzeMatch);

module.exports = router;