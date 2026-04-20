const buildServer = require('./src/server');

const start = async () => {
    try {
        const app = await buildServer();
        const port = process.env.PORT || 3002; // Corriendo en 3002 para evitar chocar con ai-service
        
        await app.listen({ port, host: '0.0.0.0' });
        console.log(`Servicio de Talento escuchando en el puerto ${port}`);
    } catch (err) {
        console.error('Error fatal al iniciar:', err);
        process.exit(1);
    }
};

start();
