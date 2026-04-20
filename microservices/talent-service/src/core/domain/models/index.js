const sequelize = require('../../../infrastructure/database/sequelize');
const CandidateProfile = require('./CandidateProfile');
const WorkExperience = require('./WorkExperience');
const Education = require('./Education');
const Skill = require('./Skill');
const CandidateSkill = require('./CandidateSkill');
const Application = require('./Application');

// Define Relationships (1-N)
CandidateProfile.hasMany(WorkExperience, { foreignKey: 'profile_id', as: 'work_experiences' });
WorkExperience.belongsTo(CandidateProfile, { foreignKey: 'profile_id' });

CandidateProfile.hasMany(Education, { foreignKey: 'profile_id', as: 'educations' });
Education.belongsTo(CandidateProfile, { foreignKey: 'profile_id' });

CandidateProfile.hasMany(Application, { foreignKey: 'profile_id', as: 'applications' });
Application.belongsTo(CandidateProfile, { foreignKey: 'profile_id' });

CandidateProfile.hasMany(CandidateSkill, { foreignKey: 'profile_id', as: 'candidate_skills' });
CandidateSkill.belongsTo(CandidateProfile, { foreignKey: 'profile_id' });

Skill.hasMany(CandidateSkill, { foreignKey: 'skill_id', as: 'candidate_associations' });
CandidateSkill.belongsTo(Skill, { foreignKey: 'skill_id', as: 'skill_details' });

module.exports = {
    sequelize,
    CandidateProfile,
    WorkExperience,
    Education,
    Skill,
    CandidateSkill,
    Application
};
