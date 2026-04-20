const { DataTypes } = require('sequelize');
const sequelize = require('../../../infrastructure/database/sequelize');

const CandidateProfile = sequelize.define('CandidateProfile', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    candidate_id: {
        // FK a nivel de aplicación hacia auth_db.candidates
        type: DataTypes.INTEGER,
        allowNull: true, // Permitir nulos para perfiles 'huérfanos' (Public Apply)
        unique: true
    },
    resume_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    headline: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    linkedin_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    is_available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    embedding_id: {
        type: DataTypes.STRING,
        allowNull: true, // FK a nivel de app hacia vector_db
    },
    // La privacidad es imperativa, si retira consentimiento, se aplica lógica de borrado suave.
    law_787_accepted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'candidate_profiles',
    timestamps: true,
});

module.exports = CandidateProfile;
