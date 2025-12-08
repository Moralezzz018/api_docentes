const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

// Usa el puerto de entorno o 3002 por defecto
const PORT = process.env.PORT || 3002;
const API_URL = process.env.API_URL || `http://localhost:${PORT}`;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API-SISTEMA-DOCENTES',
            version: '1.0.0',
            description: 'API del sistema de gestión de docentes para asistencia a clases y evaluaciones',
            contact: {
                email: 'danielmolina3003@gmail.com'
            },
        },
        servers: [
            {
                url: `${API_URL}/api`,
                description: process.env.NODE_ENV === 'production' ? 'Servidor de Producción (Railway)' : 'Servidor local',
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
        },
        security: [
            {
                BearerAuth: []
            }
        ],
    },
    apis: [path.join(__dirname, '../rutas/*.js')],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
