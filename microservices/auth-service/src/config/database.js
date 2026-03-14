const { Sequelize, DataTypes } = require("sequelize");
require('dotenv').config();

// Database Connection
const conn = new Sequelize(process.env.AUTH_DB_NAME, process.env.AUTH_DB_UNAME, process.env.AUTH_DB_PASSWORD, {
    host: process.env.AUTH_DB_HOST,
    dialect: 'postgres',
    logging: console.log,
});

module.exports = conn;