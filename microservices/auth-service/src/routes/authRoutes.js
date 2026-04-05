const authController = require('../controllers/authController');

async function authRoutes(fastify, options) {

  // Ruta para iniciar sesión
  fastify.post('/login', authController.login);

  // Ruta para registrar reclutadores/empleados de empresas
  fastify.post('/register/employee', authController.registerEmployee);

  // Ruta para registrar candidatos independientes
  fastify.post('/register/candidate', authController.registerCandidate);

  // Aquí agregaremos los TO-DOs:
  // fastify.get('/tenants/:id', authController.getTenantById);
}

module.exports = authRoutes;