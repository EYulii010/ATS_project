const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Invitation = sequelize.define('Invitation', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    tenant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    invitation_token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "reclutador"
    },
    expires_at: {
        type: DataTypes.DATE,
    },
    is_accepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

module.exports = Invitation;