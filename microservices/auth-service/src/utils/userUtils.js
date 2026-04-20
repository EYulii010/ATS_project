const { Employee, Candidate } = require('../models');

const checkIfUserExists = async (email) => {
    const [ employee, candidate ] = await Promise.all([
        Employee.findOne({where: {email}}),
        Candidate.findOne({where: { email }})
    ]);

    return !!(employee || candidate);
}

module.exports = { checkIfUserExists };