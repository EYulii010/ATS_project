const aiClient = require('../../infrastructure/aiBridge/AiClient');
const { CandidateProfile, WorkExperience, Education, Skill, CandidateSkill, Application } = require('../domain/models');
const sequelize = require('../../infrastructure/database/sequelize');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class IngestCandidateUseCase {

    /**
     * Aplica el flujo complejo de Postulación pública o manual (RF-12, RF-13).
     * Requiere el texto del CV que ya fue parseado en una capa anterior (como S3 / Multer).
     */
    async execute({ rawCvText, s3Url, law787Accepted, tenantId, candidateId = null, jobId }) {
        if (law787Accepted !== true) {
            throw new Error('La política de privacidad y tratamiento de datos (Ley 787) no fue aceptada.');
        }

        const transaction = await sequelize.transaction();

        try {
            // 1. Invocamos asíncronamente al AI Bridge (Integración de microservicios)
            const extractedData = await aiClient.extractCvData(rawCvText);

            if (!extractedData.personal_info) {
                throw new Error('El modelo generativo no logró estructurar este CV.');
            }

            // 1.5 Alternativa Local a S3 (Cero Costos)
            // Se guardará una URL local haciendo referencia a un directorio estático
            const localResumeUrl = s3Url ? s3Url : `/uploads/cv_dummies/candidato_${Date.now()}.pdf`;

            // 2. Mock del App-level Auth ID
            // Comentado para usar el candidateId dinámico:
            // const mockCandidateId = Math.floor(Math.random() * 1000000);

            // 2.5 Generar Vector Semántico del Perfil
            // Se obtiene el array (vector) del AI Bridge
            const embeddingVector = await aiClient.getEmbedding(rawCvText);
            const mockVectorId = embeddingVector ? `em_local_${crypto.randomUUID().substring(0, 8)}` : null;

            // 3. Crear el Perfil Raíz
            const profile = await CandidateProfile.create({
                candidate_id: candidateId,
                resume_url: localResumeUrl,
                headline: extractedData.summary || 'Candidato CV Recibido',
                location: extractedData.personal_info.location || '',
                phone: extractedData.personal_info.phone || '',
                linkedin_url: extractedData.personal_info.email || '',
                embedding_id: mockVectorId, // Guardando la referencia vectorial local
                law_787_accepted: true
            }, { transaction });

            // 4. Procesar Experiencia Laboral
            if (extractedData.work_experiences && extractedData.work_experiences.length > 0) {
                const workExps = extractedData.work_experiences.map(exp => ({
                    profile_id: profile.id,
                    company_name: exp.company_name || 'Desconocido',
                    job_title: exp.job_title || 'Colaborador',
                    description: exp.description || '',
                    start_date: new Date(),
                    is_current: false
                }));
                await WorkExperience.bulkCreate(workExps, { transaction });
            }

            // 5. Procesar Educaciones
            if (extractedData.educations && extractedData.educations.length > 0) {
                const educationsMapeadas = extractedData.educations.map(edu => ({
                    profile_id: profile.id,
                    institution: edu.institution || 'No especificada',
                    degree: edu.degree || 'General',
                    field_of_study: edu.field_of_study || '',
                    start_date: new Date(), // Mock date (El AI Bridge debería devolver formatos ISO)
                    is_current: false
                }));
                await Education.bulkCreate(educationsMapeadas, { transaction });
            }

            // 6. Procesar Habilidades (Skills) M:N
            if (extractedData.skills && extractedData.skills.length > 0) {
                const candidateSkillsToCreate = [];

                for (const skillItem of extractedData.skills) {
                    // Buscar o crear la habilidad en el catálogo general
                    const [skillObj] = await Skill.findOrCreate({
                        where: { name: skillItem.name || 'Habilidad Desconocida' },
                        defaults: { type: 'tecnica' }, // Default fallback
                        transaction
                    });

                    // Añadir al pivot table
                    candidateSkillsToCreate.push({
                        profile_id: profile.id,
                        skill_id: skillObj.id,
                        level: 'basico' // El nivel por defecto
                    });
                }

                if (candidateSkillsToCreate.length > 0) {
                    await CandidateSkill.bulkCreate(candidateSkillsToCreate, { transaction });
                }
            }

            // 7. Encolado del "Match Score"
            // Por arquitectura (PGVector), el match score se computará comparando `embeddingVector`
            // contra los Embeddings de las tablas de Vacantes en el backend.

            // 8. Crear la Tupla de Aplicación a Vacante
            let application = null;
            if (jobId) {
                application = await Application.create({
                    profile_id: profile.id,
                    job_id: jobId,
                    status: 'postulado',
                    // match_score: null -> Se calculará asincronamente después
                }, { transaction });
            }

            await transaction.commit();
            return {
                status: 'success',
                message: 'Candidato ingestando y analizado con éxito',
                profile_id: profile.id,
                application_id: application ? application.id : null,
                extracted_name: extractedData.personal_info.name
            };

        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = new IngestCandidateUseCase();
