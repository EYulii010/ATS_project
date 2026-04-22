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
        console.error("Error enviando email de invitación:", error);
    }
}

exports.sendPasswordResetEmail = async (toEmail, resetToken) => {
    const frontendUrl = process.env.FRONTEND_URL || 'https://app.applik-ni.com';
    const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;

    try {
        await transport.sendMail({
            from: `APPLIK Support <${process.env.EMAIL_FROM || 'support@applik.ni'}>`,
            to: toEmail,
            subject: 'Recuperación de Contraseña — Applik',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4F46E5;">Recuperación de Contraseña</h2>
                <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta.</p>
                <p>Este enlace expira en <strong>30 minutos</strong>.</p>
                <div style="text-align: center; margin: 32px 0;">
                  <a href="${resetUrl}"
                     style="background-color: #4F46E5; color: white; padding: 14px 28px;
                            text-decoration: none; border-radius: 8px; font-weight: bold;">
                    Restablecer Contraseña
                  </a>
                </div>
                <p style="color: #6B7280; font-size: 14px;">
                  Si no solicitaste este cambio, ignora este correo.
                </p>
              </div>
            `
        });
        console.log(`Email de recuperación enviado a: ${toEmail}`);
    } catch (error) {
        console.error("Error enviando email de recuperación:", error);
        throw error;
    }
};
