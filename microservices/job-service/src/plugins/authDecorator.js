const fp = require('fastify-plugin');

module.exports = fp(async (fastify, _opts) => {
  fastify.decorate('authenticate', async (request, reply) => {
    try {
      // Verifica el JWT y decodifica el payload (user_id, role, company_id, active_subscription)
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ message: 'Sesión no válida o expirada' });
    }
  });

  // Bloquea aplicantes — solo reclutadores/admins pueden gestionar vacantes
  fastify.decorate('requireEmployee', async (request, reply) => {
    if (request.user?.role === 'aplicante') {
      return reply.code(403).send({ message: 'Acceso denegado: se requiere rol de reclutador o admin.' });
    }
  });

  // Bloquea tenants con suscripción inactiva en rutas de escritura
  fastify.decorate('requireActiveSubscription', async (request, reply) => {
    if (!request.user?.active_subscription) {
      return reply.code(403).send({ message: 'Suscripción inactiva. Activa tu plan para continuar.' });
    }
  });
});
