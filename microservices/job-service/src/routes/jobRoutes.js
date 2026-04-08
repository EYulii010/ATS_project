const jobController = require('../controllers/jobController');
const departmentController = require('../controllers/departmentController');

// --- Schemas ---
const createDepartmentSchema = {
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string', minLength: 1 },
    },
  },
};

const updateDepartmentSchema = {
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string', minLength: 1 },
    },
  },
};

const createJobSchema = {
  body: {
    type: 'object',
    required: ['title', 'description', 'salary_min', 'salary_max', 'department_id'],
    properties: {
      title:         { type: 'string', minLength: 1 },
      description:   { type: 'string', minLength: 1 },
      requirements:  { type: 'string' },
      salary_min:    { type: 'number', minimum: 0 },
      salary_max:    { type: 'number', minimum: 0 },
      currency:      { type: 'string', default: 'NIO' },
      department_id: { type: 'integer' },
      closes_at:     { type: 'string', format: 'date-time' },
    },
  },
};

const updateJobSchema = {
  body: {
    type: 'object',
    properties: {
      title:         { type: 'string', minLength: 1 },
      description:   { type: 'string', minLength: 1 },
      requirements:  { type: 'string' },
      salary_min:    { type: 'number', minimum: 0 },
      salary_max:    { type: 'number', minimum: 0 },
      currency:      { type: 'string' },
      department_id: { type: 'integer' },
      closes_at:     { type: 'string', format: 'date-time' },
      status:        { type: 'string', enum: ['draft', 'published', 'paused', 'closed'] },
    },
  },
};

const getJobsSchema = {
  querystring: {
    type: 'object',
    properties: {
      status:        { type: 'string', enum: ['draft', 'published', 'paused', 'closed'] },
      department_id: { type: 'integer' },
      limit:         { type: 'integer', minimum: 1, maximum: 100, default: 20 },
      offset:        { type: 'integer', minimum: 0, default: 0 },
    },
  },
};

const publicJobsSchema = {
  querystring: {
    type: 'object',
    required: ['tenant_id'],
    properties: {
      tenant_id: { type: 'integer' },
      limit:     { type: 'integer', minimum: 1, maximum: 100, default: 20 },
      offset:    { type: 'integer', minimum: 0, default: 0 },
    },
  },
};

async function jobRoutes(fastify, _options) {
  const authOnly   = [fastify.authenticate, fastify.requireEmployee];
  const authWrite  = [fastify.authenticate, fastify.requireEmployee, fastify.requireActiveSubscription];

  // --- Departamentos ---
  fastify.post('/departments',      { schema: createDepartmentSchema, preHandler: authWrite }, departmentController.createDepartment);
  fastify.get('/departments',       { preHandler: authOnly }, departmentController.getDepartments);
  fastify.patch('/departments/:id', { schema: updateDepartmentSchema, preHandler: authWrite }, departmentController.updateDepartment);
  fastify.delete('/departments/:id',{ preHandler: authWrite }, departmentController.deleteDepartment);

  // --- Vacantes (públicas, sin auth) ---
  fastify.get('/jobs/public/:token', jobController.getJobByToken);
  fastify.get('/jobs/public', { schema: publicJobsSchema }, jobController.getPublicJobs);

  // --- Vacantes (privadas) ---
  fastify.get('/jobs/stats',  { preHandler: authOnly }, jobController.getStats);
  fastify.post('/jobs',       { schema: createJobSchema, preHandler: authWrite }, jobController.createJob);
  fastify.get('/jobs',        { schema: getJobsSchema, preHandler: authOnly }, jobController.getJobs);
  fastify.get('/jobs/:id',    { preHandler: authOnly }, jobController.getJobById);
  fastify.patch('/jobs/:id',  { schema: updateJobSchema, preHandler: authWrite }, jobController.updateJob);
  fastify.delete('/jobs/:id', { preHandler: authWrite }, jobController.deleteJob);
}

module.exports = jobRoutes;
