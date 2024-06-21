// src/db.ts
import mongoose, { ConnectOptions } from 'mongoose';
import envConfig from './envConfig';
import logger from './../logger';

const connectDB = async (): Promise<void> => {
  try {
    const dbUrl = envConfig.DB_URL;

    await mongoose.connect(dbUrl);
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
