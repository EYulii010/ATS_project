require('dotenv').config(); // 1. Carga las llaves del .env
const { sequelize } = require('./models'); // 2. Trae la conexión de config/database.js 

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
fastify.register(require('@fastify/jwt'), {
  secret: process.env.JWT_SECRET
});

fastify.register(require('./plugins/authDecorator'));

// 4. REGISTRO DE RUTAS
fastify.register(require('./routes/authRoutes'));

// 5. ARRANQUE DEL SERVICIO
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la DB establecida correctamente.');

    const port = process.env.PORT || 3002; 
    await fastify.listen({ port });
    
    console.log(`Auth Service activo en el puerto ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
