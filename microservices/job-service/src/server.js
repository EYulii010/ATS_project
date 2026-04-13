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
fastify.register(require('./routes/jobRoutes'));

const args = process.argv.slice(2);
const isProd = process.env.NODE_ENV === 'production';

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la DB establecida correctamente.');

    if (args.includes('--alter')) {
      if (isProd) {
        console.error('ERROR: --alter no está permitido en producción.');
        process.exit(1);
      }
      await sequelize.sync({ alter: true });
      console.log('Base de datos actualizada.');
    }

    const port = process.env.PORT || 3003;
    await fastify.listen({ port });

    console.log(`Job Service activo en el puerto ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
