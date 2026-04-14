const axios = require('axios');
const cheerio = require('cheerio');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

/**
 * Extrae el contenido de texto de una URL dada para obtener información sobre la cultura de la empresa.
 * @param {string} url La URL de la página de cultura/acerca de la empresa.
 * @returns {Promise<string>} El contenido de texto extraído de la página.
 */
const scrapeCompanyCulture = async (url) => {
    try {
        // Obtener el contenido HTML de la URL
        const { data } = await axios.get(url);

        // Cargar HTML en cheerio para parsearlo
        const $ = cheerio.load(data);

        // Eliminar etiquetas de script y estilo para limpiar el contenido
        $('script, style, noscript, svg').remove();

        // Obtener todo el texto del cuerpo
        const textContent = $('body').text();

        // Limpieza basica de texto (eliminar espacios en blanco y saltos de linea adicionales)
        const cleanedText = textContent.replace(/\s\s+/g, ' ').trim();

        if (!cleanedText) {
            throw new Error('No se pudo extraer texto significativo de la URL proporcionada.');
        }

        return cleanedText;

    } catch (error) {
        console.error(`Error scraping URL ${url}:`, error.message);
        // Re-throw a more user-friendly error
        throw new Error(`No se pudo obtener o analizar el contenido de la URL proporcionada. Por favor, verifique si la URL es correcta y pública.`)
    }
};

/**
 * Genera una descripción de trabajo usando IA, alineada con la cultura de la empresa.
 * @param {string} jobTitle El título del trabajo (por ejemplo, "Ingeniero de Software Senior").
 * @param {string} companyCultureText El texto extraído que representa la cultura de la empresa.
 * @returns {Promise<string>} El texto de la descripción del trabajo generado.
 */
const generateDescription = async (jobTitle, companyCultureText) => {
    const prompt = `
        Basado en la siguiente cultura y valores de la empresa, genera una descripción de trabajo atractiva y detallada para el puesto de "${jobTitle}".

        **Cultura y valores de la empresa:**
        "${companyCultureText}"

        **Instrucciones:**
        1.  **Tono y estilo:** El tono de la descripción debe reflejar la cultura de la empresa tal como se describe.
        2.  **Contenido:** Debe incluir secciones para: 
            - Una breve y atractiva introducción al puesto y la empresa.
            - Responsabilidades clave.
            - Cualificaciones y habilidades requeridas (Hard Skills).
            - Cualificaciones preferidas (Soft Skills alineadas con la cultura).
            - Un párrafo final que refuerce los valores de la empresa e invite a los candidatos a postularse.
        3.  **Formato:** Use encabezados claros y viñetas para facilitar la lectura.

        Genera solo el texto de la descripción del trabajo.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error llamando a la API de Gemini para la generación de descripciones de trabajo:', error);
        throw new Error('Error al generar la descripción del trabajo debido a un error interno de IA.');
    }
};

module.exports = {
    scrapeCompanyCulture,
    generateDescription
};
