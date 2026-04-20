const { DataTypes } = require('sequelize');
const sequelize = require('../../../infrastructure/database/sequelize');

const CandidateSkill = sequelize.define('CandidateSkill', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    profile_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    skill_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    level: {
        type: DataTypes.ENUM('basico', 'intermedio', 'avanzado', 'experto'),
        allowNull: false,
        defaultValue: 'basico'
    }
}, {
    tableName: 'candidate_skills',
    timestamps: false,
});

module.exports = CandidateSkill;
