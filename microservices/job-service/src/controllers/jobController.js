const { Job, Department } = require('../models');

// POST /jobs
exports.createJob = async (request, reply) => {
  const { title, description, requirements, salary_min, salary_max, department_id, closes_at } = request.body;
  const tenant_id = request.user.company_id;

  try {
    const job = await Job.create({
      tenant_id,
      department_id,
      title,
      description,
      requirements,
      salary_min,
      salary_max,
      closes_at,
      status: 'draft',
    });
    return reply.code(201).send(job);
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: `Database error: ${error.message}` });
  }
};

// GET /jobs
exports.getJobs = async (request, reply) => {
  const tenant_id = request.user.company_id;
  const { status, department_id } = request.query;

  const where = { tenant_id };
  if (status) where.status = status;
  if (department_id) where.department_id = department_id;

  try {
    const jobs = await Job.findAll({
      where,
      include: [{ model: Department, attributes: ['name'] }],
      order: [['createdAt', 'DESC']],
    });
    return reply.send(jobs);
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: `Database error: ${error.message}` });
  }
};

// GET /jobs/:id
exports.getJobById = async (request, reply) => {
  const { id } = request.params;
  const tenant_id = request.user.company_id;

  try {
    const job = await Job.findOne({
      where: { id, tenant_id },
      include: [{ model: Department, attributes: ['name'] }],
    });
    if (!job) return reply.code(404).send({ error: 'Vacante no encontrada.' });
    return reply.send(job);
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: `Database error: ${error.message}` });
  }
};

// PATCH /jobs/:id
exports.updateJob = async (request, reply) => {
  const { id } = request.params;
  const tenant_id = request.user.company_id;
  const { title, description, requirements, salary_min, salary_max, department_id, closes_at, status } = request.body;

  try {
    const job = await Job.findOne({ where: { id, tenant_id } });
    if (!job) return reply.code(404).send({ error: 'Vacante no encontrada.' });

    await job.update({ title, description, requirements, salary_min, salary_max, department_id, closes_at, status });
    return reply.send(job);
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: `Database error: ${error.message}` });
  }
};

// DELETE /jobs/:id
exports.deleteJob = async (request, reply) => {
  const { id } = request.params;
  const tenant_id = request.user.company_id;

  try {
    const job = await Job.findOne({ where: { id, tenant_id } });
    if (!job) return reply.code(404).send({ error: 'Vacante no encontrada.' });

    await job.destroy();
    return reply.send({ message: 'Vacante eliminada.' });
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: `Database error: ${error.message}` });
  }
};

// GET /jobs/public?tenant_id=X  — public listing for candidates (no auth)
exports.getPublicJobs = async (request, reply) => {
  const { tenant_id } = request.query;

  try {
    const jobs = await Job.findAll({
      where: { tenant_id, status: 'published' },
      include: [{ model: Department, attributes: ['name'] }],
      attributes: ['id', 'title', 'description', 'requirements', 'salary_min', 'salary_max', 'closes_at', 'createdAt'],
      order: [['createdAt', 'DESC']],
    });
    return reply.send(jobs);
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: `Database error: ${error.message}` });
  }
};

// GET /jobs/stats  — dashboard de stats básicas
exports.getStats = async (request, reply) => {
  const tenant_id = request.user.company_id;

  try {
    const [total, published, paused, closed, draft] = await Promise.all([
      Job.count({ where: { tenant_id } }),
      Job.count({ where: { tenant_id, status: 'published' } }),
      Job.count({ where: { tenant_id, status: 'paused' } }),
      Job.count({ where: { tenant_id, status: 'closed' } }),
      Job.count({ where: { tenant_id, status: 'draft' } }),
    ]);

    return reply.send({ total, published, paused, closed, draft });
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: `Database error: ${error.message}` });
  }
};
