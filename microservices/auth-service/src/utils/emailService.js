const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // sandbox.smtp.mailtrap.io
    port: process.env.EMAIL_PORT, // 2525
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
    }
});

exports.sendInvitationEmail = async (email, link) => {
    try {
        await transport.sendMail({
            // Usamos el remitente desde el .env o el fallback por defecto
            from: `APPLIK Support <${process.env.EMAIL_FROM || 'support@applik.ni'}>`,
            to: email,
            subject: "Invitación a equipo de reclutamiento [APPLIK]",
            html: `
                <p>Has sido invitad@ a unirte a una empresa en APPLIK.<p>
                <a href="${link}">Haz clic aquí para completar tu registro</a>
            `
        });
        console.log(`Email de invitación enviado a: ${email}`);
    } catch (error) {
        // Logueamos el error pero no dejamos que rompa la ejecución del controlador
        console.error("Error enviando email de invitación:", error);
    }
}
