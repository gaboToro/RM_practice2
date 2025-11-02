// backend/strapi-server/config/middlewares.js

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    'strapi::logger',
    'strapi::errors',
    'strapi::security',
    {
        // Reemplazamos la cadena simple por un objeto de configuración
        name: 'strapi::cors',
        config: {
            // Configuración clave: permitir el dominio de Render del Front-end
            origin: ['https://vanillajs-frontend.onrender.com', 'http://localhost:8080'], 
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
            headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
            keepHeaderOnError: true,
        },
    },
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
];