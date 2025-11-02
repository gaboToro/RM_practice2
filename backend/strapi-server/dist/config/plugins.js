module.exports = ({ env }) => ({
  // Configuración para el plugin 'users-permissions' (usuarios y permisos)
  'users-permissions': {
    enabled: true,
    config: {
      jwtSecret: env('JWT_SECRET'), // Usa la variable de entorno ya definida
    },
  },
  // Configuración de CORS, si no lo hiciste en middlewares.js, añádelo aquí
  // 'cors': { ... } 
});