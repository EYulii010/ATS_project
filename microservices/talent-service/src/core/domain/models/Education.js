const { DataTypes } = require('sequelize');
const sequelize = require('../../../infrastructure/database/sequelize');

const Education = sequelize.define('Education', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    profile_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    institution: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    degree: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    field_of_study: {
        type: DataTypes.STRING,
        allowNull: false,
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
    tableName: 'educations',
    timestamps: true,
});

module.exports = Education;
