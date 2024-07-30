import 'module-alias/register';
import express from 'express';
import logger from './logger'; // Import the logger module
import { envConfig, connectDB } from '@config';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '@docs';
import {errorHandler } from '@utils';
import router from '@routes'
connectDB();

const app = express();
const PORT = envConfig.PORT;
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1',router);
app.use(errorHandler);
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});


process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});