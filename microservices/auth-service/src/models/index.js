const sequelize = require('../config/database');
const Tenant = require('./Tenant');
const Employee = require('./Employee');
const Candidate = require('./Candidate');
const Invitation = require('./Invitation');
const Session = require('./Session');
const PasswordResetToken = require('./PasswordResetToken');

// Tenant <-> Employee
Tenant.hasMany(Employee, { foreignKey: 'tenant_id' });
Employee.belongsTo(Tenant, { foreignKey: 'tenant_id' });

// Tenant <-> Invitation (Added CASCADE)
Tenant.hasMany(Invitation, { foreignKey: 'tenant_id', onDelete: 'CASCADE' });
Invitation.belongsTo(Tenant, { foreignKey: 'tenant_id' });

// Sessions (Fixed the 'models.' typo)
Employee.hasMany(Session, { foreignKey: 'employee_id', onDelete: 'CASCADE' });
Candidate.hasMany(Session, { foreignKey: 'candidate_id', onDelete: 'CASCADE' });

// Password Reset Tokens
Employee.hasMany(PasswordResetToken, { foreignKey: 'employee_id', onDelete: 'CASCADE' });
PasswordResetToken.belongsTo(Employee, { foreignKey: 'employee_id' });

module.exports = {
  sequelize,
  Tenant,
  Employee,
  Candidate,
  Invitation,
  Session,
  PasswordResetToken
};