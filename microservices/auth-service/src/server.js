require('dotenv').config(); // 1. Carga las llaves del .env
const { sequelize } = require('./models'); // 2. Trae la conexión de config/database.js 
const authRoutes = require('./routes/authRoutes');

// Añadier logger más bonito (pino-pretty)
const fastify = require('fastify')({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z', // Human readable time
        ignore: 'pid,hostname',      // Hide the noisy machine info
      },
    },
  },
});

// 3. REGISTRO DE PLUGINS
fastify.register(require('@fastify/cors'), {
  origin: ['http://localhost:5173', 'https://applik-ni.com', 'https://www.applik-ni.com', 'https://app.applik-ni.com']
});

fastify.register(require('@fastify/jwt'), {
  secret: process.env.JWT_SECRET
});

fastify.register(require('./plugins/authDecorator'));

// 4. REGISTRO DE RUTAS
fastify.register(authRoutes, { prefix: '/api/v1/auth' });

const args = process.argv.slice(2); // Get command line arguments

// 5. ARRANQUE DEL SERVICIO
const start = async () => {
  try {
    // Sincronización - Seguro para Producción
    const isDev = process.env.NODE_ENV !== 'production';
    await sequelize.sync({ alter: isDev });
    console.log(isDev ? 'Dev/E2E Mode: Base de datos actualizada con alter: true.' : 'Prod Mode: Alter desactivado.');
    
    await sequelize.authenticate();
    console.log('Conexión a la DB establecida correctamente.');

    const port = process.env.PORT || 3002; 
    await fastify.listen({ port, host: '0.0.0.0' });
    
    console.log(`Auth Service activo en el puerto ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
