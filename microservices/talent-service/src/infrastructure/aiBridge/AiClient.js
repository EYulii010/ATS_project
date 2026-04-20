const axios = require('axios');

class AiBridgeClient {
    constructor() {
        // En producción sería http://ai-service:3000 o la IP respectiva
        this.client = axios.create({
            baseURL: process.env.AI_SERVICE_URL || 'http://localhost:3000/api/v1',
            timeout: 30000, // Extendido debido al NLP / LLM latency
        });
    }

    /**
     * Extrae información estructurada (incluyendo Referencias RF-20) desde un CV de texto crudo.
     */
    async extractCvData(rawText) {
        try {
            const response = await this.client.post('/cv/ingest-cv', {
                cvText: rawText
            });
            return response.data.data;
        } catch (error) {
            console.error('[AI Bridge] Fallo al extraer CV:', error.message);
            throw new Error('No se pudo establecer puente cognitivo con el CV.');
        }
    }

    /**
     * Llama al motor de embeddings para convertir texto descriptivo en vectores
     */
    async getEmbedding(text) {
        try {
            const response = await this.client.post('/embedding-engine', { text });
            return response.data.embedding; // Array de floats
        } catch (error) {
            console.error('[AI Bridge] Fallo al obtener Embedding:', error.message);
            return null; // Fallback manejable
        }
    }
}

module.exports = new AiBridgeClient();
