const { Department } = require('../models');

// POST /departments
exports.createDepartment = async (request, reply) => {
  const { name } = request.body;
  const tenant_id = request.user.company_id;

  try {
    const department = await Department.create({ tenant_id, name });
    return reply.code(201).send(department);
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: `Database error: ${error.message}` });
  }
};

// GET /departments
exports.getDepartments = async (request, reply) => {
  const tenant_id = request.user.company_id;

  try {
    const departments = await Department.findAll({ where: { tenant_id } });
    return reply.send(departments);
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: `Database error: ${error.message}` });
  }
};

// PATCH /departments/:id
exports.updateDepartment = async (request, reply) => {
  const { id } = request.params;
  const tenant_id = request.user.company_id;
  const { name } = request.body;

  try {
    const department = await Department.findOne({ where: { id, tenant_id } });
    if (!department) return reply.code(404).send({ error: 'Departamento no encontrado.' });

    await department.update({ name });
    return reply.send(department);
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: `Database error: ${error.message}` });
  }
};

// DELETE /departments/:id
exports.deleteDepartment = async (request, reply) => {
  const { id } = request.params;
  const tenant_id = request.user.company_id;

  try {
    const department = await Department.findOne({ where: { id, tenant_id } });
    if (!department) return reply.code(404).send({ error: 'Departamento no encontrado.' });

    await department.destroy();
    return reply.send({ message: 'Departamento eliminado.' });
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: `Database error: ${error.message}` });
  }
};
