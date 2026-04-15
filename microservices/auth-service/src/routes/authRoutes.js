const authController = require('../controllers/authController');
const invitationController = require('../controllers/invitationController');

async function authRoutes(fastify, options) {

  // Ruta para iniciar sesión
  fastify.post('/login', authController.handleLogin);

  // Ruta para registrar usuario. OJO: Requiere un campo user_type en el body
  fastify.post('/register', authController.handleRegisterApplicant);

  // Aquí agregaremos los TO-DOs:
  fastify.post('/organizations/register', authController.handleRegisterOrganization);
  // fastify.get('/tenants/:id', authController.getTenantById);

  // Ruta protegida para invitar nuevo usuario reclutador
  fastify.post('/invitations/create', {
    onRequest: [fastify.authenticate]
  }, invitationController.createInvitation)

  // Este lo llama http://localhost:${process.env.PORT}/api/v1/auth/register/reclutador al darle submit
  fastify.post('/invitations/accept', invitationController.handleAcceptInvitation);
}

module.exports = authRoutes;