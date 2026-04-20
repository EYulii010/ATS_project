require('dotenv').config();
const { sequelize } = require('./models');

const fastify = require('fastify')({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
});

// PLUGINS
fastify.register(require('@fastify/jwt'), {
  secret: process.env.JWT_SECRET
});

fastify.register(require('./plugins/authDecorator'));

// RUTAS
fastify.register(require('./routes/jobRoutes'), { prefix: '/api/v1' });

const args = process.argv.slice(2);
const isProd = process.env.NODE_ENV === 'production';

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la DB establecida correctamente.');

    const isDev = process.env.NODE_ENV !== 'production';
    await sequelize.sync({ alter: isDev });
    console.log(isDev ? 'Dev/E2E Mode: Base de datos actualizada con alter.' : 'Prod Mode: Alter desactivado.');

    const port = process.env.PORT || 3003;
    await fastify.listen({ port, host: '0.0.0.0' });

    console.log(`Job Service activo en el puerto ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
