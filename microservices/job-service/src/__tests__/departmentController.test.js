'use strict';

jest.mock('../models', () => ({
  Job: {},
  Department: {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  },
}));

const departmentController = require('../controllers/departmentController');
const { Department } = require('../models');

const makeReply = () => {
  const reply = {};
  reply.code = jest.fn().mockReturnValue(reply);
  reply.send = jest.fn().mockReturnValue(reply);
  return reply;
};

const makeRequest = ({ body = {}, params = {}, user = {} } = {}) => ({
  body,
  params,
  user: { id: 1, company_id: 1, role: 'admin', ...user },
  log: { error: jest.fn() },
});

beforeEach(() => jest.clearAllMocks());

// ---------------------------------------------------------------------------
// createDepartment
// ---------------------------------------------------------------------------
describe('createDepartment', () => {
  test('creates a department and returns 201', async () => {
    const fakeDept = { id: 1, tenant_id: 1, name: 'Tecnología' };
    Department.create.mockResolvedValue(fakeDept);

    const req = makeRequest({ body: { name: 'Tecnología' } });
    const reply = makeReply();

    await departmentController.createDepartment(req, reply);

    expect(Department.create).toHaveBeenCalledWith({ tenant_id: 1, name: 'Tecnología' });
    expect(reply.code).toHaveBeenCalledWith(201);
    expect(reply.send).toHaveBeenCalledWith(fakeDept);
  });

  test('returns 500 on DB error', async () => {
    Department.create.mockRejectedValue(new Error('DB failure'));

    const req = makeRequest({ body: { name: 'Tecnología' } });
    const reply = makeReply();

    await departmentController.createDepartment(req, reply);

    expect(reply.code).toHaveBeenCalledWith(500);
  });
});

// ---------------------------------------------------------------------------
// getDepartments
// ---------------------------------------------------------------------------
describe('getDepartments', () => {
  test('returns departments filtered by tenant_id', async () => {
    const fakeDepts = [{ id: 1, name: 'Tecnología' }];
    Department.findAll.mockResolvedValue(fakeDepts);

    const req = makeRequest();
    const reply = makeReply();

    await departmentController.getDepartments(req, reply);

    expect(Department.findAll).toHaveBeenCalledWith({ where: { tenant_id: 1 } });
    expect(reply.send).toHaveBeenCalledWith(fakeDepts);
  });
});

// ---------------------------------------------------------------------------
// updateDepartment
// ---------------------------------------------------------------------------
describe('updateDepartment', () => {
  test('updates and returns the department', async () => {
    const fakeDept = { id: 1, update: jest.fn().mockResolvedValue(true) };
    Department.findOne.mockResolvedValue(fakeDept);

    const req = makeRequest({ params: { id: 1 }, body: { name: 'RRHH' } });
    const reply = makeReply();

    await departmentController.updateDepartment(req, reply);

    expect(fakeDept.update).toHaveBeenCalledWith({ name: 'RRHH' });
    expect(reply.send).toHaveBeenCalledWith(fakeDept);
  });

  test('returns 404 when department does not exist', async () => {
    Department.findOne.mockResolvedValue(null);

    const req = makeRequest({ params: { id: 999 }, body: { name: 'RRHH' } });
    const reply = makeReply();

    await departmentController.updateDepartment(req, reply);

    expect(reply.code).toHaveBeenCalledWith(404);
  });
});

// ---------------------------------------------------------------------------
// deleteDepartment
// ---------------------------------------------------------------------------
describe('deleteDepartment', () => {
  test('deletes the department and confirms', async () => {
    const fakeDept = { id: 1, destroy: jest.fn().mockResolvedValue(true) };
    Department.findOne.mockResolvedValue(fakeDept);

    const req = makeRequest({ params: { id: 1 } });
    const reply = makeReply();

    await departmentController.deleteDepartment(req, reply);

    expect(fakeDept.destroy).toHaveBeenCalled();
    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });

  test('returns 404 when department does not exist', async () => {
    Department.findOne.mockResolvedValue(null);

    const req = makeRequest({ params: { id: 999 } });
    const reply = makeReply();

    await departmentController.deleteDepartment(req, reply);

    expect(reply.code).toHaveBeenCalledWith(404);
  });
});
