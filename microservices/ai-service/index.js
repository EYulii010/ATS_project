const express = require('express');
const dotenv = require('dotenv');

// Load environment variables before requiring local modules
dotenv.config();

// --- Middleware de grado de producción ---
const helmet = require('helmet'); // Asegura las cabeceras HTTP
const compression = require('compression'); // Comprime los cuerpos de respuesta
const rateLimit = require('express-rate-limit'); // Limita la tasa de solicitudes

// --- Importar rutas ---
const apiRoutes = require('./src/routes/api');
const cvRoutes = require('./src/routes/cvRoutes');
const jobRoutes = require('./src/routes/jobRoutes');

const app = express();

// --- Middleware principal ---
app.use(helmet()); // Aplicar cabeceras de seguridad temprano
app.use(express.json()); // Middleware para parsear cuerpos de solicitud JSON
app.use(compression()); // Comprimir todas las rutas

// --- Limitador de tasa ---
// Aplicar un limitador de tasa a todas las rutas API para prevenir abusos
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limitar cada IP a 100 solicitudes por ventana
    standardHeaders: true, // Devolver información de límite de tasa en las cabeceras `RateLimit-*`
    legacyHeaders: false, // Deshabilitar las cabeceras `X-RateLimit-*`
    message: 'Demasiadas solicitudes desde esta IP, por favor, inténtalo de nuevo en 15 minutos'
});

// --- API Routes ---
// Aplicar el limitador a todas las rutas que comienzan con /api/v1
app.use('/api/v1', apiLimiter);

app.use('/api/v1', apiRoutes);
app.use('/api/v1/cv', cvRoutes);
app.use('/api/v1/jobs', jobRoutes);


// --- Manejador de errores centralizado ---
app.use((err, req, res, next) => {
    console.error(`[Error] ${err.message}`);
    res.status(500).json({ error: 'Something went wrong on our side. Please try again later.' });
});

module.exports = app;

if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}
