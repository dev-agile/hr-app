import dotenv from 'dotenv';
dotenv.config();

interface EnvConfig {
  PORT: number;
  DB_URL: string;
  NODE_ENV: string;
  JWT_SECRET: string;
  JWT_EXPIRATION_ACCESS: string;
  JWT_EXPIRATION_REFRESH: string;
  API_BASE_URL: string; // Add this line
}

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${key} is required`);
  }
  return value || defaultValue!;
};

const envConfig: EnvConfig = {
  PORT: parseInt(getEnvVar('PORT', '3000'), 10),
  DB_URL: getEnvVar('DB_URL', 'mongodb://localhost/mydatabase'),
  NODE_ENV: getEnvVar('NODE_ENV', 'development'),
  JWT_SECRET: getEnvVar('JWT_SECRET'),
  JWT_EXPIRATION_ACCESS: getEnvVar('JWT_EXPIRATION_ACCESS'),
  JWT_EXPIRATION_REFRESH: getEnvVar('JWT_EXPIRATION_REFRESH'),
  API_BASE_URL: getEnvVar('API_BASE_URL'), // Add this line
};

export default envConfig;
