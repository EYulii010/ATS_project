const sequelize = require('../config/database');
const Tenant = require('./Tenant');
const Employee = require('./Employee');
const Candidate = require('./Candidate');

Tenant.hasMany(Employee, { foreignKey: 'tenant_id' });
Employee.belongsTo(Tenant, {foreignKey: 'tenant_id'});

module.exports = {
  sequelize,
  Tenant,
  Employee,
  Candidate
};