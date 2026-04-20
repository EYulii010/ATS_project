const candidateController = require('./CandidateController');
const tenantInterceptor = require('../middleware/tenantInterceptor');

async function routes(fastify, options) {
    // Registramos el interceptor de Privacidad
    fastify.register(tenantInterceptor);

    // POST /api/v1/talents/public/apply (Público, no requiere Auth, Requiere jobToken)
    fastify.post('/public/apply', {
        schema: {
            description: 'Postulación pública a una vacante mediante token seguro.',
            tags: ['Talent'],
            body: {
                type: 'object',
                required: ['rawCvText', 'law787Accepted', 'jobToken'],
                properties: {
                    rawCvText: { type: 'string', minLength: 20 },
                    s3Url: { type: 'string', nullable: true }, // Opcional
                    law787Accepted: { type: 'boolean', enum: [true] }, // Estricto
                    jobToken: { type: 'string', format: 'uuid' }
                }
            }
        }
    }, candidateController.applyPublic.bind(candidateController));

    // POST /api/v1/talents/upload (Manual por Reclutador, requiere JWT y jobId)
    fastify.post('/upload', { 
        preValidation: [tenantInterceptor],
        schema: {
            description: 'Carga manual de un CV hacia un JobID específico (Requiere Token Reclutador).',
            tags: ['Talent'],
            security: [{ bearerAuth: [] }],
            body: {
                type: 'object',
                required: ['rawCvText', 'jobId'],
                properties: {
                    rawCvText: { type: 'string', minLength: 20 },
                    s3Url: { type: 'string', nullable: true },
                    jobId: { type: 'integer' }
                }
            }
        }
    }, candidateController.uploadManual.bind(candidateController));
    
    fastify.patch('/applications/:id/status', {
        schema: {
            description: 'Actualizar la etapa del candidato en el pipeline.',
            tags: ['Talent'],
            security: [{ bearerAuth: [] }],
            params: {
                type: 'object',
                required: ['id'],
                properties: { id: { type: 'integer' } }
            },
            body: {
                type: 'object',
                required: ['newStatus'],
                properties: {
                    newStatus: { type: 'string', enum: ['postulado', 'revisando', 'entrevista', 'rechazado', 'contratado'] }
                }
            }
        }
    }, candidateController.updatePipelineStatus.bind(candidateController));
}

module.exports = routes;
