require('dotenv').config(); // 1. Carga las llaves del .env
const fastify = require('fastify')({ logger: true });
const { sequelize } = require('./models'); // 2. Trae la conexión de config/database.js 

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
    await fastify.listen({ port, host: '0.0.0.0' });
    
    console.log(`Auth Service activo en el puerto ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();