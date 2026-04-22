const { DataTypes } = require('sequelize');
const sequelize = require('../../../infrastructure/database/sequelize');

const ApplicationStageHistory = sequelize.define('ApplicationStageHistory', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    application_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    stage: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    changed_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'application_stage_history',
    timestamps: false,
});

module.exports = ApplicationStageHistory;
