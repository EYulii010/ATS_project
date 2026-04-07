const asyncHandler = require('express-async-handler');
const jobService = require('../services/jobService');
const cvService = require('../services/cvService');

/**
 * @desc    Analiza una lista de candidatos contra una descripción de trabajo, considerando el ajuste cultural.
 * @route   POST /api/v1/match-analysis
 * @access  Private
 */
exports.analyzeMatch = asyncHandler(async (req, res) => {
    const { jobDescription, applicants, companyUrl } = req.body;

    // 1. Validar la entrada esencial
    if (!jobDescription || !applicants || !Array.isArray(applicants) || applicants.length === 0) {
        res.status(400);
        throw new Error('A jobDescription and a non-empty array of applicants are required.');
    }

    let cultureText = '';
    // 2. Si se proporciona una URL de empresa, rasparla para obtener información cultural
    if (companyUrl) {
        try {
            cultureText = await jobService.scrapeCompanyCulture(companyUrl);
        } catch (error) {
            // Si el raspado falla, aún podemos proceder. La capa de servicio es lo suficientemente robusta.
            console.warn(`Warning: Could not scrape company culture from ${companyUrl}. Proceeding with technical ranking only.`);
        }
    }

    // 3. Delegar la lógica principal de clasificación al cvService
    // Utilizará el cultureText si está disponible, o realizará una coincidencia técnica en caso contrario.
    const rankedApplicants = await cvService.rankApplicants(jobDescription, applicants, cultureText);

    // 4. Enviar la respuesta exitosa
    res.status(200).json({
        message: "Análisis de coincidencia completado exitosamente.",
        data: rankedApplicants
    });
});
