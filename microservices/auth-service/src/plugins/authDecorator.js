const fp = require('fastify-plugin');

module.exports = fp(async (fastify, opts) => {
  fastify.decorate("authenticate", async (request, reply) => {
    try {
      // Esta función verifica el JWT y decodifica el payload
      await request.jwtVerify();
    } catch (err) {
      // Si el token expiró o es falso, respondemos con un error 401
      reply.code(401).send({ message: 'Sesión no válida o expirada' });
    }
  });
});