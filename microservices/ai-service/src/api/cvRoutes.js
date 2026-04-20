const express = require('express');
const cvController = require('../controllers/cvController');

const router = express.Router();

// POST /api/ingest-cv -> Ruta para recibir CV por URL 
// Se elimina el middleware de carga ya que estamos aceptando un JSON payload.
router.post('/ingest-cv', cvController.ingestCv);

// POST /api/rank-applicants -> Ruta para analizar y clasificar candidatos para una vacante
router.post('/rank-applicants', cvController.rankApplicants);


module.exports = router;