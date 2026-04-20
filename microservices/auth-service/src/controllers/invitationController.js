const dotenv = require('dotenv').config()
const crypto = require('crypto');
const { Invitation, Employee, Session, sequelize } = require('../models');
const { checkIfUserExists } = require('../utils/userUtils');
const { joinSQLFragments } = require('sequelize/lib/utils/join-sql-fragments');
const { sendInvitationEmail } = require('../utils/emailService');
const { validatePasswordStrength } = require('../utils/passwordUtils')

exports.createInvitation = async (request, reply) => {
    const { user_id, role, company_id } = request.user;
    const validateEmailRegex = /^\S+@\S+\.\S+$/;
    const { email } = request.body

    if (role !== "admin"){
        console.error(`No se pudo crear invitación: el usuario con id ${user_id} no tiene rol de 'admin'`);
        return reply.code(403).send({
            success: false,
            message: `No se pudo crear invitación: el usuario con id ${user_id} no tiene rol de 'admin'`
        })
    }

    const admin = await Employee.findOne({where : {
        id: user_id
    }});

    const adminEmail = admin.email;

    if (!adminEmail || !validateEmailRegex.test(adminEmail)){
        console.error(`Dirección de correo de Admin inválida: ${adminEmail}`);
        return reply.code(400).send({
            success: false,
            message: `Dirección de correo de Admin inválida: ${adminEmail}`
        });
    }

    if (await checkIfUserExists(email)) {
        console.error(`La dirección del nuevo reclutador ya está en uso: ${email}`);
        return reply.code(400).send({
            success: false,
            message: `La dirección del nuevo reclutador ya está en uso: ${email}`
        });
    }

    const pendingInvitation = await Invitation.findOne({
        where: {
            tenant_id: company_id,
            is_accepted: false,
            email: email,
        }
    });

    if (pendingInvitation){
       const isExpired = new Date() > new Date(pendingInvitation.expires_at);
       
       if (!isExpired) {
            return reply.code(409).send({
                success: false,
                message: `Ya existe una invitación activa para ${email}. Expira el ${pendingInvitation.expires_at.toLocaleString()}`
            });
       }

       // Invitación pendiente expirada
       await pendingInvitation.destroy();
       console.log(`Eliminando invitación expirada para ${email} para generar una nueva.`);
    }
    
    // Secret key para la invitación
    const token = crypto.randomBytes(32).toString('hex');

    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);

    try {
        const createdInvitation = await Invitation.create({
            email: email,
            tenant_id: company_id,
            invitation_token: token,
            role: "reclutador",
            expires_at: expiresAt,
        });

        // ESTE LINK ES DEL FRONTEND NO DEL AUTH !!!
        const inviteLink = `http://localhost:5173/register/reclutador?token=${token}&email=${email}`;
        // Enviar el link por log para testing
        request.log.info(`[MOCK EMAIL] To: ${email} | Subject: Únete a mi equipo en APPLIK | Link: ${inviteLink}`);
        // Enviar el link usando el emailService
        await sendInvitationEmail(email, inviteLink);

        return reply.code(201).send({
            success: true,
            message: `Invitación enviada exitosamente a ${email}`,
            data: {
                invitation_id: createdInvitation.id,
                expires_at: createdInvitation.expires_at
            }
        })
    } catch (error){
        console.error(`Error al crear nueva invitación: ${error}`);
        return reply.code(500).send({
            success: false,
            message: `Error al crear nueva invitación: ${error}`
        });
    }
}

exports.handleAcceptInvitation = async (request, reply) => {
    const {token, email, password, first_name, last_name, law_787_accepted } = request.body;
    const validateEmailRegex = /^\S+@\S+\.\S+$/;

    const transaction = await sequelize.transaction();

    const passwordCheck = validatePasswordStrength(password);
    if (!passwordCheck.isValid){
        return reply.code(400).send({
            success: false,
            field: "password", // Le decimos al frontend qué campo falló
            message: passwordCheck.message
        });
    }
    
    try{
        if (!law_787_accepted){
            await transaction.rollback();
            return reply.code(400).send({
                success: false,
                message: `El usuario reclutador no aceptó los términos de privacidad`
            });
        }
        
        const invitation = await Invitation.findOne({where: {
            invitation_token: token
        }});
        
        if (!invitation || invitation.email !== email) {
            await transaction.rollback();
            return reply.code(400).send({ 
                success: false, 
                message: "Invitación inválida, ya utilizada o el correo no coincide." 
            });
        }

        if (new Date() > new Date(invitation.expires_at)) {
            await transaction.rollback();
            return reply.code(410).send({ success: false, message: "La invitación ha expirado." });
        }
        
        const createdRecruiter = await Employee.create({
            email: email,
            first_name,
            last_name,
            password,
            role: "reclutador",
            tenant_id: invitation.tenant_id,
            law_787_accepted
        }, {transaction: transaction});

        console.log(`Created user ID: ${createdRecruiter.id}`);

        await invitation.update({ is_accepted: true }, { transaction });

        await transaction.commit();

        const payload = {
            user_id: createdRecruiter.id,
            role: 'reclutador',
            company_id: createdRecruiter.tenant_id,
            active_subscription: true // Hard coded aquí :p
        }

        const jwtToken = await reply.jwtSign(payload);

        const sessionExpiry = new Date();
        sessionExpiry.setHours(sessionExpiry.getHours() + 8);

        await Session.create({
            token: jwtToken,
            employee_id: createdRecruiter.id,
            expires_at: sessionExpiry
        });

        return reply.code(201).send({
            success: true,
            message: `Se creó usuario reclutador: ${createdRecruiter.id}`,
            data: {
                user_id: createdRecruiter.id,
                token: jwtToken
            }
        });
    } catch (error) {
        if (transaction && !transaction.finished) {
            await transaction.rollback();
        }
        
       if (error.name === 'SequelizeValidationError') {
        const detalles = error.errors.map(e => ({ campo: e.path, mensaje: e.message }));
        console.error("DETALLE DEL ERROR DE VALIDACIÓN:", detalles);
        return reply.code(400).send({
            success: false,
            message: "Error de validación en la base de datos",
            errors: detalles
        });
    }
        
        request.log.error(error);
        return reply.code(500).send({
            success: false,
            message: `Error después del commit: ${error.message}`
        });
    }
}