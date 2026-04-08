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

exports.handleLogin = async (request, reply) => {
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

exports.handleRegister = async (request, reply) => {
  const { email, password, first_name, last_name, law_787_accepted, tenant_id, role, user_type } = request.body;
  
  let createdUser;

  if (!law_787_accepted) {
    console.error("El usuario no a aceptado la ley 787")
    return reply.code(400).send({error: "El usuario no a aceptado la ley 787"});
  }

  if (await checkIfUserExists(email)){
    console.error(`Usuario con correo ${email} ya existe.`)
    return reply.code(400).send({error: `Usuario con correo ${email} ya existe.`});
  }

  try {  
    switch (user_type) {
      // Logica para crear usuario Employee
      case "employee":
        // Validar tenant
        const tenant = await Tenant.findOne({where: {id: tenant_id}});
        if (!tenant) return reply.code(404).send({ message: `No se ha encontrado a la compañia con id ${tenant_id}`});
        
        try{
          createdUser = await Employee.create({
            email,
            password,
            first_name,
            last_name,
            law_787_accepted,
            role,
            tenant_id,
        });
      } catch (error){
        console.log("Could not create new employee: ", error);
        reply.code(500).send({error: `Database error: ${error}`});
      }
        break;

      // Lógica para crear usuario candidate
      case "candidate":
        try {
          createdUser = await Candidate.create({
          email,
          password,
          first_name,
          last_name,
          law_787_accepted
        });
        } catch (error) {
            request.log.error("Could not create new candidate: ", error);
            reply.code(500).send({ error: `Database error: ${error.message}` });
        }
        break;

      default :
        return reply.code(400).send({message: "user type not found"});
    }

  return reply.code(201).send({
      status: "success",
      message: `Cuenta creada exitosamente para ${createdUser.email}`,
      data: { 
        id: createdUser.id, 
        type: user_type,
        organization: user_type === "employee" ? tenant_id : "N/A" 
      }
    });

  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: "Error en en servidor al registrar usuario" });
  }
}


