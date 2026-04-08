const authController = require('../controllers/authController');

async function authRoutes(fastify, options) {

  // Ruta para iniciar sesión
  fastify.post('/login', authController.handleLogin);

  // Ruta para registrar usuario. OJO: Requiere un campo user_type en el body
  fastify.post('/register', authController.handleRegister);

  // Aquí agregaremos los TO-DOs:
  // fastify.get('/tenants/:id', authController.getTenantById);
}

module.exports = authRoutes;