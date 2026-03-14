const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const Employee = sequelize.define('Employee', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tenant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  law_787_accepted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
}, {
  hooks: {
    beforeSave: async (employee) => {
      if (employee.changed('password')) {
        const saltRounds = 12;
        const pepper = process.env.AUTH_DB_PEPPER;

        if (!pepper) {
          throw new Error("SECRET_MANAGEMENT_ERROR: Pepper is not defined in .env");
        }

        const passwordWithPepper = employee.password + pepper;
        employee.password = await bcrypt.hash(passwordWithPepper, saltRounds);
      }
    }
  },
  timestamps: true
});

module.exports = Employee;