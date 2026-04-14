const asyncHandler = require('express-async-handler');
const jobService = require('../services/jobService');

/**
 * @desc    Genera una descripción de trabajo alineada con la cultura de la empresa desde una URL.
 * @route   POST /api/v1/jobs/generate-description
 * @access  Private
 */
const generateJobDescription = asyncHandler(async (req, res) => {
    const { jobTitle, companyUrl } = req.body;

    if (!jobTitle || !companyUrl) {
        res.status(400);
        throw new Error('Both jobTitle and companyUrl are required in the request body.');
    }

    // 1. Raspar el texto de la cultura de la empresa desde la URL proporcionada
    const cultureText = await jobService.scrapeCompanyCulture(companyUrl);

    // 2. Generar la descripción del trabajo basada en la cultura raspada
    const jobDescription = await jobService.generateDescription(jobTitle, cultureText);

    res.status(201).json({
        message: "Descripción del trabajo generada exitosamente.",
        data: jobDescription
    });
});

module.exports = {
    generateJobDescription
};
