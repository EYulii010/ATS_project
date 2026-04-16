const axios = require('axios');

class JobBridgeClient {
    constructor() {
        // En producción HTTP hacia el service interno o la URL externa de balanceador
        this.client = axios.create({
            baseURL: process.env.JOB_SERVICE_URL || 'http://localhost:3003/api/v1',
            timeout: 5000, 
        });
    }

    /**
     * Resuelve un Public Token y obtiene la metadata de la vacante.
     * Retorna { id, title, tenant_id, ... } o lanza error si expira o no existe.
     */
    async getJobByToken(token) {
        try {
            const response = await this.client.get(`/jobs/public/${token}`);
            return response.data;
        } catch (error) {
            console.error('[Job Bridge] Fallo al resolver el Job Token:', error.message);
            throw new Error('El token de la vacante es inválido, expirado o inaccesible.');
        }
    }
}

module.exports = new JobBridgeClient();
