import express from 'express';
import bodyParser from 'body-parser';
import logger from './logger'; // Import the logger module
import { envConfig, connectDB } from '@config';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '@docs';
import { errorHandler } from '@utils';
import router from '@routes';
import cors from 'cors'; // Import the cors module
import cookieParser from 'cookie-parser'; // Import cookie-parser

connectDB();

const app = express();
app.use(cookieParser()); // Use cookie-parser middleware

const PORT = envConfig.PORT;

// Enable CORS for multiple environments
const allowedOrigins = ['http://localhost:5000', 'https://hr-app-2j6d.vercel.app'];
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true // Allow credentials
}));

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1', router);
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