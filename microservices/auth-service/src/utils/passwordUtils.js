const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');

// Ya lo hace el modelo sequelize

// const hashPassword = async (password) => {
//     const pepper = process.env.AUTH_DB_PEPPER;
//     const saltRounds = 10;

//     return await bcrypt.hash(password + pepper, saltRounds);
// }

const verifyPassword = async (password, hash) => {
    const pepper = process.env.AUTH_DB_PEPPER;
    return await bcrypt.compare(password + pepper, hash);
};

const validatePasswordStrength = (password) => {
    const errors = [];
    
    if (!password) {
        return {isValid: false, message: "La contraseña es obligatoria."};
    }

    if (password.length < 8){
        errors.push("Debe tener al menos 8 caracteres.");
    }
    if (!/[A-Z]/.test(password)) {
        errors.push("Debe incluir al menos una letra mayúscula.");
    }
    if (!/[a-z]/.test(password)) {
        errors.push("Debe incluir al menos una letra minúscula.");
    }
    if (!/[0-9]/.test(password)) {
        errors.push("Debe incluir al menos un número.");
    }

    if (errors.length > 0) {
        return {
            isValid: false,
            message: errors[0], // Primer error
            allErrors: errors // Opcional, por si el frontend quiere mostrar una lista
        };
    }

    return {isValid: true}
}

module.exports = {
    verifyPassword,
    validatePasswordStrength
}