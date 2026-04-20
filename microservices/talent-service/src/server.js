const fastify = require('fastify');
const cors = require('@fastify/cors');
const sequelize = require('./infrastructure/database/sequelize');

const buildServer = async () => {
    const app = fastify({
        logger: {
            transport: {
                target: 'pino-pretty'
            }
        }
    });

    // CORS and Security Headers
    await app.register(cors, {
        origin: '*', // Customize this for production
    });

    // Ruta de estado
    app.get('/estado', async (request, reply) => {
        return { estado: 'saludable', servicio: 'talent-service' };
    });

    // Rutas de API
    // Añadimos Swagger para auto-documentación
    app.register(require('@fastify/swagger'), {
      openapi: {
        info: {
          title: 'Talent Service API',
          description: 'API central para la gestión, ingesta y parseo de CVs usando Inteligencia Artificial.',
          version: '1.0.0'
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT'
            }
          }
        }
      }
    });

    app.register(require('@fastify/swagger-ui'), {
      routePrefix: '/api/v1/talents/docs',
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false
      }
    });

    app.register(require('./interfaces/http/candidateRoutes'), { prefix: '/api/v1/talents' });

    // Intentar Conexión de Base de Datos
    try {
        await sequelize.authenticate();
        app.log.info('La conexion a la base de datos PostgreSQL se ha establecido con exito.');
        // Sincronización - Seguro para Producción
        const isDev = process.env.NODE_ENV !== 'production';
        if (isDev) {
            await sequelize.sync({ alter: true });
            app.log.info('Dev Mode: Modelos BD Sincronizados Automáticamente.');
        } else {
            app.log.info('Prod Mode: Sincronización automática deshabilitada.');
        }
    } catch (error) {
        console.error('\n--- DETALLE DEL ERROR DE BASE DE DATOS ---');
        console.error(error.message);
        console.error('------------------------------------------\n');
        app.log.error('No se pudo conectar a la base de datos');
    }

    return app;
};

module.exports = buildServer;
