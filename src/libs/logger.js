import { createLogger, format, transports } from "winston";
 
// Define los formatos de registro
const logFormat = format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
);
  
  // Crea un logger personalizado
const logger = createLogger({
    level: 'info', // Nivel mínimo de registro
    format: logFormat, // Formato de registro personalizado
    transports: [
      new transports.Console(), // Registra en la consola
      new transports.File({ filename: './logs/conexionLog.log' }) // Registra en un archivo llamado "app.log"
    ]
});
export default logger;