const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

/**
 * Procesar texto de CV crudo y extraer datos estructurados usando IA.
 * Esta función se mantiene para la ingesta directa de CV si es necesario.
 */
const processAndStoreCv = async (cvText) => {
    const prompt = `
        Analiza el siguiente texto de CV y extrae la información en un objeto JSON estructurado.
        El objeto JSON debe incluir claves para "personal_info", "summary", "work_experience", 
        "education", "skills", y extraccion estructurada para "references" (que de detectar texto en el archivo de este tipo, contenga nombre, empresa y teléfono).

        Texto del CV:
        "${cvText}"
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        // Limpieza basica para asegurar que la salida sea JSON valido
        const cleanedJson = response.text().replace(/```json|```/g, '').trim();
        return JSON.parse(cleanedJson);
    } catch (error) {
        console.error('Error procesando CV con Gemini:', error);
        throw new Error('Error al procesar CV debido a un error interno de IA.');
    }
};

module.exports = {
    processAndStoreCv
};
