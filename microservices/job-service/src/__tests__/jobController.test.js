'use strict';

jest.mock('../models', () => ({
  Job: {
    create: jest.fn(),
    findAndCountAll: jest.fn(),
    findOne: jest.fn(),
    count: jest.fn(),
  },
  Department: {},
}));

const jobController = require('../controllers/jobController');
const { Job } = require('../models');

// Helpers to build fake request/reply objects
const makeReply = () => {
  const reply = {};
  reply.code = jest.fn().mockReturnValue(reply);
  reply.send = jest.fn().mockReturnValue(reply);
  return reply;
};

const makeRequest = ({ body = {}, params = {}, query = {}, user = {} } = {}) => ({
  body,
  params,
  query,
  user: { id: 1, company_id: 1, role: 'admin', active_subscription: true, ...user },
  log: { error: jest.fn() },
});

beforeEach(() => jest.clearAllMocks());

// ---------------------------------------------------------------------------
// createJob
// ---------------------------------------------------------------------------
describe('createJob', () => {
  test('creates a job and returns 201', async () => {
    const fakeJob = { id: 1, title: 'Dev Backend', status: 'draft' };
    Job.create.mockResolvedValue(fakeJob);

    const req = makeRequest({
      body: {
        title: 'Dev Backend',
        description: 'Descripción',
        salary_min: 10000,
        salary_max: 20000,
        department_id: 1,
      },
    });
    const reply = makeReply();

    await jobController.createJob(req, reply);

    expect(Job.create).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Dev Backend',
        tenant_id: 1,
        created_by: 1,
        status: 'draft',
      })
    );
    expect(reply.code).toHaveBeenCalledWith(201);
    expect(reply.send).toHaveBeenCalledWith(fakeJob);
  });

  test('returns 400 when salary_max < salary_min', async () => {
    const req = makeRequest({
      body: {
        title: 'Dev Backend',
        description: 'Descripción',
        salary_min: 50000,
        salary_max: 10000,
        department_id: 1,
      },
    });
    const reply = makeReply();

    await jobController.createJob(req, reply);

    expect(Job.create).not.toHaveBeenCalled();
    expect(reply.code).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.stringContaining('salary_max') })
    );
  });

  test('returns 500 on DB error', async () => {
    Job.create.mockRejectedValue(new Error('DB failure'));

    const req = makeRequest({
      body: {
        title: 'Dev Backend',
        description: 'Desc',
        salary_min: 10000,
        salary_max: 20000,
        department_id: 1,
      },
    });
    const reply = makeReply();

    await jobController.createJob(req, reply);

    expect(reply.code).toHaveBeenCalledWith(500);
  });
});

// ---------------------------------------------------------------------------
// getJobs
// ---------------------------------------------------------------------------
describe('getJobs', () => {
  test('returns paginated list filtered by tenant_id', async () => {
    const fakeResult = { count: 2, rows: [{ id: 1 }, { id: 2 }] };
    Job.findAndCountAll.mockResolvedValue(fakeResult);

    const req = makeRequest({ query: { limit: 20, offset: 0 } });
    const reply = makeReply();

    await jobController.getJobs(req, reply);

    expect(Job.findAndCountAll).toHaveBeenCalledWith(
      expect.objectContaining({ where: expect.objectContaining({ tenant_id: 1 }) })
    );
    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({ total: 2, data: fakeResult.rows })
    );
  });

  test('applies status filter when provided', async () => {
    Job.findAndCountAll.mockResolvedValue({ count: 0, rows: [] });

    const req = makeRequest({ query: { status: 'published', limit: 20, offset: 0 } });
    const reply = makeReply();

    await jobController.getJobs(req, reply);

    expect(Job.findAndCountAll).toHaveBeenCalledWith(
      expect.objectContaining({ where: expect.objectContaining({ status: 'published' }) })
    );
  });
});

// ---------------------------------------------------------------------------
// getJobById
// ---------------------------------------------------------------------------
describe('getJobById', () => {
  test('returns the job when found', async () => {
    const fakeJob = { id: 1, title: 'Dev' };
    Job.findOne.mockResolvedValue(fakeJob);

    const req = makeRequest({ params: { id: 1 } });
    const reply = makeReply();

    await jobController.getJobById(req, reply);

    expect(reply.send).toHaveBeenCalledWith(fakeJob);
  });

  test('returns 404 when job does not exist', async () => {
    Job.findOne.mockResolvedValue(null);

    const req = makeRequest({ params: { id: 999 } });
    const reply = makeReply();

    await jobController.getJobById(req, reply);

    expect(reply.code).toHaveBeenCalledWith(404);
  });
});

// ---------------------------------------------------------------------------
// updateJob
// ---------------------------------------------------------------------------
describe('updateJob', () => {
  test('updates and returns the job', async () => {
    const fakeJob = { id: 1, update: jest.fn().mockResolvedValue(true) };
    Job.findOne.mockResolvedValue(fakeJob);

    const req = makeRequest({
      params: { id: 1 },
      body: { title: 'Nuevo título', salary_min: 10000, salary_max: 20000 },
    });
    const reply = makeReply();

    await jobController.updateJob(req, reply);

    expect(fakeJob.update).toHaveBeenCalled();
    expect(reply.send).toHaveBeenCalledWith(fakeJob);
  });

  test('returns 404 when job does not exist', async () => {
    Job.findOne.mockResolvedValue(null);

    const req = makeRequest({ params: { id: 999 }, body: {} });
    const reply = makeReply();

    await jobController.updateJob(req, reply);

    expect(reply.code).toHaveBeenCalledWith(404);
  });

  test('returns 400 when salary_max < salary_min', async () => {
    const req = makeRequest({
      params: { id: 1 },
      body: { salary_min: 30000, salary_max: 5000 },
    });
    const reply = makeReply();

    await jobController.updateJob(req, reply);

    expect(Job.findOne).not.toHaveBeenCalled();
    expect(reply.code).toHaveBeenCalledWith(400);
  });
});

// ---------------------------------------------------------------------------
// deleteJob
// ---------------------------------------------------------------------------
describe('deleteJob', () => {
  test('deletes the job and confirms', async () => {
    const fakeJob = { id: 1, destroy: jest.fn().mockResolvedValue(true) };
    Job.findOne.mockResolvedValue(fakeJob);

    const req = makeRequest({ params: { id: 1 } });
    const reply = makeReply();

    await jobController.deleteJob(req, reply);

    expect(fakeJob.destroy).toHaveBeenCalled();
    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });

  test('returns 404 when job does not exist', async () => {
    Job.findOne.mockResolvedValue(null);

    const req = makeRequest({ params: { id: 999 } });
    const reply = makeReply();

    await jobController.deleteJob(req, reply);

    expect(reply.code).toHaveBeenCalledWith(404);
  });
});

// ---------------------------------------------------------------------------
// getJobByToken
// ---------------------------------------------------------------------------
describe('getJobByToken', () => {
  test('returns job for a valid published token', async () => {
    const fakeJob = { id: 1, title: 'Dev' };
    Job.findOne.mockResolvedValue(fakeJob);

    const req = makeRequest({ params: { token: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' } });
    const reply = makeReply();

    await jobController.getJobByToken(req, reply);

    expect(Job.findOne).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ status: 'published' }),
      })
    );
    expect(reply.send).toHaveBeenCalledWith(fakeJob);
  });

  test('returns 404 for invalid UUID format without hitting DB', async () => {
    const req = makeRequest({ params: { token: 'not-a-uuid' } });
    const reply = makeReply();

    await jobController.getJobByToken(req, reply);

    expect(Job.findOne).not.toHaveBeenCalled();
    expect(reply.code).toHaveBeenCalledWith(404);
  });

  test('returns 404 when token not found or job not published', async () => {
    Job.findOne.mockResolvedValue(null);

    const req = makeRequest({ params: { token: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' } });
    const reply = makeReply();

    await jobController.getJobByToken(req, reply);

    expect(reply.code).toHaveBeenCalledWith(404);
  });
});

// ---------------------------------------------------------------------------
// getPublicJobs
// ---------------------------------------------------------------------------
describe('getPublicJobs', () => {
  test('returns only published jobs for the given tenant', async () => {
    const fakeResult = { count: 1, rows: [{ id: 1, title: 'Dev' }] };
    Job.findAndCountAll.mockResolvedValue(fakeResult);

    const req = makeRequest({ query: { tenant_id: 2, limit: 20, offset: 0 } });
    const reply = makeReply();

    await jobController.getPublicJobs(req, reply);

    expect(Job.findAndCountAll).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { tenant_id: 2, status: 'published' },
      })
    );
    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({ total: 1 })
    );
  });
});

// ---------------------------------------------------------------------------
// getStats
// ---------------------------------------------------------------------------
describe('getStats', () => {
  test('returns counts for all statuses', async () => {
    Job.count.mockResolvedValueOnce(5)  // total
      .mockResolvedValueOnce(2)         // published
      .mockResolvedValueOnce(1)         // paused
      .mockResolvedValueOnce(1)         // closed
      .mockResolvedValueOnce(1);        // draft

    const req = makeRequest();
    const reply = makeReply();

    await jobController.getStats(req, reply);

    expect(reply.send).toHaveBeenCalledWith({
      total: 5,
      published: 2,
      paused: 1,
      closed: 1,
      draft: 1,
    });
  });
});
