const { Job, Department } = require('../models');

// POST /jobs
exports.createJob = async (request, reply) => {
  const { title, description, requirements, salary_min, salary_max, currency, department_id, closes_at } = request.body;
  const tenant_id = request.user.company_id;
  const created_by = request.user.user_id;

  if (salary_max < salary_min) {
    return reply.code(400).send({ error: 'salary_max debe ser mayor o igual a salary_min.' });
  }

  try {
    const job = await Job.create({
      tenant_id,
      department_id,
      created_by,
      title,
      description,
      requirements,
      salary_min,
      salary_max,
      currency,
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
  const { status, department_id, limit = 20, offset = 0 } = request.query;

  const where = { tenant_id };
  if (status) where.status = status;
  if (department_id) where.department_id = department_id;

  try {
    const { count, rows: jobs } = await Job.findAndCountAll({
      where,
      include: [{ model: Department, attributes: ['name'] }],
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });
    return reply.send({ total: count, limit, offset, data: jobs });
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
  const { title, description, requirements, salary_min, salary_max, currency, department_id, closes_at, status } = request.body;

  const effectiveMin = salary_min ?? undefined;
  const effectiveMax = salary_max ?? undefined;
  if (effectiveMin !== undefined && effectiveMax !== undefined && effectiveMax < effectiveMin) {
    return reply.code(400).send({ error: 'salary_max debe ser mayor o igual a salary_min.' });
  }

  try {
    const job = await Job.findOne({ where: { id, tenant_id } });
    if (!job) return reply.code(404).send({ error: 'Vacante no encontrada.' });

    await job.update({ title, description, requirements, salary_min, salary_max, currency, department_id, closes_at, status });
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

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// GET /jobs/public/:token  — job detail by public token (no auth, for application form)
exports.getJobByToken = async (request, reply) => {
  const { token } = request.params;

  if (!UUID_REGEX.test(token)) {
    return reply.code(404).send({ error: 'Vacante no encontrada o no disponible.' });
  }

  try {
    const job = await Job.findOne({
      where: { public_token: token, status: 'published' },
      include: [{ model: Department, attributes: ['name'] }],
      attributes: ['id', 'title', 'description', 'requirements', 'salary_min', 'salary_max', 'currency', 'closes_at', 'createdAt'],
    });
    if (!job) return reply.code(404).send({ error: 'Vacante no encontrada o no disponible.' });
    return reply.send(job);
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: `Database error: ${error.message}` });
  }
};

// GET /jobs/public?tenant_id=X  — public listing for candidates (no auth)
exports.getPublicJobs = async (request, reply) => {
  const { tenant_id, limit = 20, offset = 0 } = request.query;

  try {
    const { count, rows: jobs } = await Job.findAndCountAll({
      where: { tenant_id, status: 'published' },
      include: [{ model: Department, attributes: ['name'] }],
      attributes: ['id', 'title', 'description', 'requirements', 'salary_min', 'salary_max', 'currency', 'closes_at', 'createdAt'],
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });
    return reply.send({ total: count, limit, offset, data: jobs });
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
