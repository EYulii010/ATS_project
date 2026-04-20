const ingestCandidate = require('../../core/useCases/IngestCandidate');
const jobClient = require('../../infrastructure/jobBridge/JobClient');
const { Application } = require('../../core/domain/models');

class CandidateController {

    /**
     * POST /api/v1/talents/apply
     * Postulación Externa Directa (RF-12)
     */
    async applyPublic(request, reply) {
        const { rawCvText, s3Url, law787Accepted, jobToken } = request.body;
        
        try {
            if (!jobToken) {
                return reply.code(400).send({ error: 'Es obligatorio proveer un jobToken válido para aplicar.' });
            }

            // Consultar Job-Service cruzado para resolver la metadata
            const jobData = await jobClient.getJobByToken(jobToken);
            const result = await ingestCandidate.execute({
                rawCvText,
                s3Url,
                law787Accepted,
                tenantId: request.tenantId || jobData.tenant_id, // Si no está loggeado, toma el del job
                jobId: jobData.id,
                candidateId: request.user && request.user.role === 'candidate' ? request.user.user_id : null
            });
            return reply.code(201).send(result);
        } catch (error) {
            request.log.error({ err: error }, 'Error aplicando en perfil público:');
            console.error('TRACE COMPLETO:', error);
            if (error.message.includes('Ley 787')) {
                return reply.code(403).send({ error: error.message });
            }
            return reply.code(500).send({ error: 'Fallo al procesar postulación pública' });
        }
    }

    /**
     * POST /api/v1/talents/upload
     * Carga Manual por Reclutador (RF-13)
     */
    async uploadManual(request, reply) {
        const { rawCvText, s3Url, jobId } = request.body;
        const law787Accepted = true; // Si es reclutador, se asumen firmas físicas previas o B2B

        try {
            if (!jobId) {
                return reply.code(400).send({ error: 'Debes especificar el jobId en la carga manual del CV.' });
            }
            const result = await ingestCandidate.execute({
                rawCvText,
                s3Url,
                law787Accepted,
                tenantId: request.tenantId, // Asegurado por JWT
                jobId: jobId,
                candidateId: null 
            });
            return reply.code(201).send(result);
        } catch (error) {
            request.log.error('Error en carga manual:', error);
            return reply.code(500).send({ error: 'Fallo al procesar carga manual' });
        }
    }

    /**
     * PATCH /api/v1/talents/applications/:id/status
     * Gestiona el Pipeline (RF-16)
     */
    async updatePipelineStatus(request, reply) {
        const { id } = request.params;
        const { newStatus } = request.body; // ej. 'entrevista'

        try {
            const application = await Application.findByPk(id);
            if (!application) {
                return reply.code(404).send({ error: 'Postulación no encontrada' });
            }

            // (En caso extendido, aquí se comprobaría si el request.tenantId es el dueño de esta postulación)
            
            application.status = newStatus;
            await application.save();

            return reply.code(200).send({
                message: 'Estado del pipeline actualizado',
                status: application.status
            });

        } catch (error) {
            request.log.error('Fallo moviendo pipeline:', error);
            return reply.code(500).send({ error: 'Fallo en la Base de Datos.' });
        }
    }
}

module.exports = new CandidateController();
