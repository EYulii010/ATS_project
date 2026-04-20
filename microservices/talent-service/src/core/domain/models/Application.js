const { DataTypes } = require('sequelize');
const sequelize = require('../../../infrastructure/database/sequelize');

const Application = sequelize.define('Application', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    profile_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    job_id: {
        // FK a nivel de aplicación -> job_db.jobs
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('postulado', 'revisando', 'entrevista', 'rechazado', 'contratado'),
        allowNull: false,
        defaultValue: 'postulado'
    },
    match_score: {
        type: DataTypes.DECIMAL(3, 2), // 0.00 to 1.00
        allowNull: true,
    },
    applied_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'applications',
    timestamps: true,
});

module.exports = Application;
