const multer = require('multer');

// Usando memoryStorage para manejar el archivo como un buffer en memoria sin guardarlo en disco.
// Esto es ideal para un servicio sin estado que procesa el archivo sobre la marcha.
const storage = multer.memoryStorage();

// Crear la instancia de carga de multer
const upload = multer({
    storage: storage,
    // Agregar un filtro de archivos para seguridad
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            // Aceptar el archivo
            cb(null, true);
        } else {
            // Rechazar el archivo
            cb(new Error('Tipo de archivo inválido. Solo se permiten archivos PDF.'), false);
        }
    }
});

module.exports = upload;
