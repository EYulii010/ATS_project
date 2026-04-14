const jwt = require('jsonwebtoken');

/**
 * Middleware para autenticar solicitudes usando un JSON Web Token (JWT).
 * Verifica el token del encabezado 'Authorization'.
 */
const authMiddleware = (req, res, next) => {
    // 1. Obtener el token del encabezado 'Authorization'
    const authHeader = req.headers.authorization;

    // 2. Verificar si el encabezado existe y está formateado correctamente
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            error: 'Authentication failed: No token provided or invalid format.'
        });
    }

    // Extraer el token de "Bearer <token>"
    const token = authHeader.split(' ')[1];

    try {
        // 3. Verificar el token usando la clave secreta
        // Esto lanzará un error si el token es inválido o ha expirado
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Adjuntar el payload decodificado al objeto de solicitud
        // Ahora, los controladores posteriores pueden acceder a la información del usuario como req.user.tenantId
        req.user = decodedPayload;

        // 5. Pasar el control al siguiente middleware o controlador
        next();

    } catch (error) {
        // Manejar errores de verificación de token (por ejemplo, expirado, firma inválida)
        return res.status(401).json({
            error: 'Authentication failed: Invalid or expired token.'
        });
    }
};

module.exports = authMiddleware;
