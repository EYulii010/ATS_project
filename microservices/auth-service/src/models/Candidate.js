const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const Candidate = sequelize.define('Candidate', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
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
  law_787_accepted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
}, {
  hooks: {
    beforeSave: async (candidate) => {
      if (candidate.changed('password')) {
        const saltRounds = 12;
        const pepper = process.env.AUTH_DB_PEPPER;

        if (!pepper) {
          throw new Error("SECRET_MANAGEMENT_ERROR: Pepper is not defined in .env");
        }

        const passwordWithPepper = candidate.password + pepper;
        candidate.password = await bcrypt.hash(passwordWithPepper, saltRounds);
      }
    }
  },
  timestamps: true
});

module.exports = Candidate;