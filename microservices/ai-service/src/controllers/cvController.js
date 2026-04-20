const asyncHandler = require('express-async-handler');
const cvService = require('../services/cvService');
const jobService = require('../services/jobService'); // Import the job service

/**
 * @desc    Procesa el texto crudo del CV, extrae datos estructurados y lo almacena.
 * @route   POST /api/v1/cv/ingest-cv
 * @access  Private
 */
const ingestCvText = asyncHandler(async (req, res) => {
    const { cvText } = req.body;

    if (!cvText) {
        res.status(400); // Bad Request
        throw new Error('CV text is required in the request body.');
    }

    // La capa de servicio maneja la lógica principal
    const structuredCv = await cvService.processAndStoreCv(cvText);

    res.status(201).json({
        message: "CV processed and stored successfully.",
        data: structuredCv
    });
});

module.exports = {
    ingestCvText
};
