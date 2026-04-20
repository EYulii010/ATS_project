const fp = require('fastify-plugin');
const jwt = require('jsonwebtoken');

/**
 * Middleware para extraer y validar el tenant_id (Ley 787 de Privacidad).
 * Previene exposición cruzada de datos entre empresas (tenants).
 */
module.exports = fp(async function (fastify, opts) {
    fastify.decorateRequest('tenantId', null);
    fastify.decorateRequest('user', null);

    fastify.addHook('preValidation', async (request, reply) => {
        try {
            // Permitir endpoints públicos o rutas exentas como la postulación directa del candidato
            if (request.url && request.url.includes('/public/')) {
                return;
            }

            const authHeader = request.headers.authorization;
            if (!authHeader) {
                return reply.code(401).send({ error: 'Token Authorization requerido por Ley 787.' });
            }

            const token = authHeader.replace('Bearer ', '');

            // Decodificamos validando contra el mismo JWT_SECRET que usa auth-service
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'test-secret');

            if (!decoded.company_id) {
                return reply.code(403).send({ error: 'Token inválido: falta company_id, restricción de aislamiento vulnerada.' });
            }

            request.tenantId = decoded.company_id;
            request.user = decoded; // ej. { userId: 1, role: 'recruiter', company_id: 10 }
        } catch (err) {
            request.log.error('Fallo en la autenticación / integridad del Tenant:', err);
            return reply.code(401).send({ error: 'Autorización Denegada o Expirada.' });
        }
    });
});
