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

/**
 * @desc    Clasifica una lista de candidatos contra una descripción de trabajo, considerando el ajuste cultural.
 * @route   POST /api/v1/cv/rank-applicants
 * @access  Private
 */
const rankApplicants = asyncHandler(async (req, res) => {
    const { jobDescription, applicants, companyUrl } = req.body;

    // Basic validation
    if (!jobDescription || !applicants || !Array.isArray(applicants)) {
        res.status(400);
        throw new Error('Job description and a list of applicants are required.');
    }

    let cultureText = '';
    // Si se proporciona una URL de empresa, rasparla para obtener información cultural
    if (companyUrl) {
        try {
            cultureText = await jobService.scrapeCompanyCulture(companyUrl);
        } catch (error) {
            // Si el raspado falla, aún podemos proceder sin él, pero deberíamos registrarlo.
            console.warn(`Warning: Could not scrape company culture from ${companyUrl}. Proceeding with technical ranking only.`);
            // Opcionalmente, podrías informar al cliente.
            // return res.status(400).json({ error: error.message });
        }
    }

    // La capa de servicio maneja la lógica principal, ahora con contexto cultural
    const rankedApplicants = await cvService.rankApplicants(jobDescription, applicants, cultureText);

    res.status(200).json({
        message: "Applicants ranked successfully with cultural fit analysis.",
        data: rankedApplicants
    });
});


module.exports = {
    ingestCvText,
    rankApplicants
};
