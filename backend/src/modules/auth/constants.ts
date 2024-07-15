
export const jwtSecret = process.env.JWT_SECRET || 'secret'; // Clave
export const jwtExpirationTime = parseInt(process.env.JWT_EXPIRATION_TIME) || 3600; // Tiempo de expiración
