const { Sequelize } = require('sequelize');
require('dotenv').config();

// Conectar a la DB en PostgreSQL nativo (Local sin Docker)
const sequelize = new Sequelize(
    process.env.DB_NAME || 'talent_db',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'adminpassword',
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: false, // Configurar como console.log para ver queries SQL si es necesario
    }
);

module.exports = sequelize;
