const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento en MEMORIA (para Railway)
// Los archivos se almacenan temporalmente en req.file.buffer
const storage = multer.memoryStorage();

// Filtro de archivos - solo Excel
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.ms-excel' // .xls
    ];
    
    if (allowedTypes.includes(file.mimetype) || /\.(xlsx|xls)$/i.test(file.originalname)) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten archivos Excel (.xlsx o .xls)'), false);
    }
};

const uploadExcel = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // Límite de 10MB
    }
});

module.exports = { uploadExcel };
