const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tenant = sequelize.define('Tenant', {
  business_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
subscription_plan : {

    type: DataTypes.STRING,
    allowNull: false

  },
  RUC: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  active_subscription : {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
}, { 
  timestamps: true 
});

module.exports = Tenant;