const genAI = require('../config/geminiClient');

exports.createEmbedding = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || typeof text !== 'string') {
            return res.status(400).json({ error: 'Se requiere una cadena de texto no vacía en el cuerpo de la solicitud.' });
        }

        const model = genAI.getGenerativeModel({ model: 'embedding-001' });

        const result = await model.embedContent(text);
        const embedding = result.embedding.values;

        res.status(200).json({ embedding });

    } catch (error) {
        console.error('Error creando embedding:', error);
        res.status(500).json({
            error: 'Error al crear embedding.',
            details: error.message
        });
    }
};