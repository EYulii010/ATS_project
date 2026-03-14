const bcrypt = require('bcrypt');
const { Employee, Candidate } = require('../models');

exports.login = async (request, reply) => {
  const { email, password } = request.body;
  const pepper = process.env.AUTH_DB_PEPPER;

  try {
    // Buscamos al usuario
    const user = await Employee.findOne({ where: { email } });

    // Si no existe el usuario, respondemos con error
    if (!user) {
      return reply.code(401).send({ message: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password + pepper, user.password);

    if (isMatch) {
      const token = request.server.jwt.sign({ 
        user_id: user.id,
        email: user.email, 
        role: user.role,
        company_id: user.tenant_id,
      }, { expiresIn: "2h" });

      return { token };
    }
    
    return reply.code(401).send({ message: 'Credenciales inválidas' });
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ message: 'Error interno del servidor' });
  }
};

exports.employees = async (request, reply) => {
  const { email, password, first_name, last_name, tenant_id, law_787_accepted, role } = request.body;

  try {
    const newEmployee = await Employee.create({
      email,
      first_name,
      last_name,
      password,
      tenant_id,
      role,
      law_787_accepted,
    });
    return newEmployee;
  } catch (error) {
    request.log.error("Could not create new employee: ", error);
    reply.code(500).send({ error: `Database error: ${error.message}` });
  }
};

exports.registerCandidate = async (request, reply) => {
  const { email, password, first_name, last_name, law_787_accepted } = request.body;

  try {
    const newCandidate = await Candidate.create({
      email,
      password,
      first_name,
      last_name,
      law_787_accepted
    });
    return newCandidate;
  } catch (error) {
    request.log.error("Could not create new candidate: ", error);
    reply.code(500).send({ error: `Database error: ${error.message}` });
  }
};

exports.registerEmployee = async (request, reply) => {
  const { email, password, first_name, last_name, tenant_id, law_787_accepted, role } = request.body;

  // We will need a middleware to validate that data

  const employeeObject = {
    email,
    first_name,
    last_name,
    password,
    tenant_id,
    role,
    law_787_accepted,
  };

  try {
    const newEmployee = await Employee.create(employeeObject);
    return newEmployee;
  } catch (error) {
    console.log("Could not create new employee: ", error);
    reply.code(500).send({error: `Database error: ${error}`});
  }
  
}