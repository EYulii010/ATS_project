const { DataTypes } = require('sequelize');
const sequelize = require('../../../infrastructure/database/sequelize');

const Skill = sequelize.define('Skill', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    type: {
        type: DataTypes.ENUM('tecnica', 'blanda', 'idioma'),
        allowNull: false,
    }
}, {
    tableName: 'skills',
    timestamps: false, // Usualmente un catálogo
});

module.exports = Skill;
