const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Session = sequelize.define('Session', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'Employees', key: 'id' }
    },
    candidate_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'Candidates', key: 'id' }
    },
    token : {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_revoked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
}, {
    hooks: {
        beforeValidate: (session) => {
            if (!session.employee_id && !session.candidate_id) {
                throw new Error('A session must belong to either an Employee or a Candidate.');
            }
            if (session.employee_id && session.candidate_id) {
                throw new Error('A session cannot belong to both an Employee and a Candidate simultaneously.');
            }
        }
    }
})

module.exports = Session;