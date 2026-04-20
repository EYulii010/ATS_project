const { DataTypes } = require('sequelize');
const sequelize = require('../../../infrastructure/database/sequelize');

const WorkExperience = sequelize.define('WorkExperience', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    profile_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    company_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    job_title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    is_current: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'work_experiences',
    timestamps: true,
});

module.exports = WorkExperience;
