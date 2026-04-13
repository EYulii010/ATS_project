const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const pepper = process.env.AUTH_PEPPER;
    const saltRounds = 10;

    return await bcrypt.hash(password + pepper, saltRounds);
}

const verifyPassword = async (password, hash) => {
    const pepper = process.env.AUTH_PEPPER;
    return await bcrypt.compare(password + pepper, hash);
};

module.exports = {
    hashPassword,
    verifyPassword
}