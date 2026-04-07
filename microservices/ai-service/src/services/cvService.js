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
        "education", y "skills".

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

/**
 * Clasifica a los solicitantes contra una descripción de trabajo, considerando habilidades y ajuste cultural.
 * @param {string} jobDescription La descripción completa del trabajo.
 * @param {Array<Object>} applicants Un array de objetos de solicitantes, cada uno con una propiedad `cvText`.
 * @param {string} [companyCultureText] Texto opcional que describe la cultura de la empresa.
 * @returns {Promise<Array<Object>>} Una lista ordenada de solicitantes con puntajes de coincidencia y razonamiento.
 */
const rankApplicants = async (jobDescription, applicants, companyCultureText = '') => {
    const prompt = `
        **Objetivo:** Clasifica a los siguientes solicitantes para un puesto basado en la descripción del trabajo y la cultura de la empresa proporcionadas.

        **Descripción del trabajo:**
        "${jobDescription}"

        **Cultura de la empresa (si se proporciona):**
        "${companyCultureText}"

        **Aplicantes:**
        ${JSON.stringify(applicants.map((app, index) => ({ id: index, cv: app.cvText })))}

        **Instrucciones:**
        1.  **Analizar holísticamente:** Evalúa el CV de cada solicitante contra las habilidades y la experiencia requeridas en la descripción del trabajo.
        2.  **Ajuste cultural:** Si se proporciona texto de la cultura de la empresa, evalúa cómo las habilidades blandas, la experiencia y el tono del solicitante se alinean con los valores de la empresa. Un candidato técnicamente fuerte que no se alinea con la cultura debería tener una puntuación más baja.
        3.  **Calcular puntaje de coincidencia:** Para cada solicitante, proporciona un puntaje de coincidencia porcentual (0-100). El puntaje debe reflejar tanto la calificación técnica como la alineación cultural.
        4.  **Proporcionar razonamiento:** Para cada solicitante, proporciona un texto de "razonamiento" breve y perspicaz (2-3 oraciones) que explique *por qué* recibieron su puntaje, mencionando fortalezas o debilidades específicas con respecto tanto a las habilidades como al ajuste cultural.

        **Formato de salida:**
        Devuelve una única matriz JSON válida de objetos. Cada objeto debe tener estas claves exactas: "applicant_id", "match_score", y "reasoning". La matriz debe estar ordenada en orden descendente por "match_score".

        Ejemplo:
        [
          {
            "applicant_id": 1,
            "match_score": 95,
            "reasoning": "Excelente coincidencia. Más de 5 años de experiencia con todas las tecnologías requeridas y muestra cualidades de liderazgo que se alinean con nuestra cultura colaborativa."
          }
        ]
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const cleanedJson = response.text().replace(/```json|```/g, '').trim();
        return JSON.parse(cleanedJson);
    } catch (error) {
        console.error('Error clasificando solicitantes con Gemini:', error);
        throw new Error('Error al clasificar solicitantes debido a un error interno de IA.');
    }
};

module.exports = {
    processAndStoreCv,
    rankApplicants
};
