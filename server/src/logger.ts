// src/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info', // Set the logging level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(), // Log to the console
  ],
});

export default logger;
