const bcrypt = require('bcrypt');
const { Employee, Candidate, Tenant } = require('../models');

const checkIfUserExists = async (email) => {
  // Busca el email en ambos tipos de usuario
  const employee = await Employee.findOne({ where: { email } });
  if (employee) return true;

  const candidate = await Candidate.findOne({ where: { email } });
  // Retorna true si se encuentra al user en cualquiera de las dos;
  return !!candidate; 
};

exports.login = async (request, reply) => {
  const { email, password } = request.body;
  const pepper = process.env.AUTH_DB_PEPPER;

  try {
    // Buscamos al usuario en Employees
    let user = await Employee.findOne({ where: { email } });
    let isSubscriptionActive = null;
    // Si el usuario no está en Employees, buscar en Candidates
    if (!user) {
      user = await Candidate.findOne({where : {email}});
      if (!user) return reply.code(401).send({ message: 'Credenciales inválidas' });

      user.tenant_id = null;
      user.role = "candidate";
    } else {
      const tenant = await Tenant.findOne({where: {id: user.tenant_id}});
      if (!tenant) return reply.code(401).send({ message: 'Company information not found.'});
      isSubscriptionActive = tenant.active_subscription;
    }

    const isMatch = await bcrypt.compare(password + pepper, user.password);

    if (isMatch) {
      // Payload se define aquí !!!
      const token = request.server.jwt.sign({ 
        user_id: user.id, 
        role: user.role,
        company_id: user.tenant_id,
        active_subscription: isSubscriptionActive,
      }, { expiresIn: "2h" });

      return { token };
    }
    return reply.code(401).send({ message: 'Credenciales inválidas' });
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ message: 'Error interno del servidor' });
  }
};

exports.registerEmployee = async (request, reply) => {
  const { email, password, first_name, last_name, tenant_id, law_787_accepted, role } = request.body;

  if (await checkIfUserExists(email)){
    console.error(`User ${email} is already registered.`)
    return reply.code(400).send({error: `User ${email} is already registered.`});
  }

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

  if (await checkIfUserExists(email)){
    console.error(`User ${email} is already registered.`)
    return reply.code(400).send({error: `User ${email} is already registered.`});
  }

  try {
    const newCandidate = await Candidate.create({
      email,
      password,
      first_name,
      last_name,
      law_787_accepted
    });
    return reply.code(201).send(`Successfully created candidate profile ${newCandidate.email}`);
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
    return reply.code(201).send(`Successfully created employee profile ${newEmployee.email}`);
  } catch (error) {
    console.log("Could not create new employee: ", error);
    reply.code(500).send({error: `Database error: ${error}`});
  }
  
}