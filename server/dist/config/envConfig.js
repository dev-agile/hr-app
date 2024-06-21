"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getEnvVar = (key, defaultValue) => {
    const value = process.env[key];
    if (!value && !defaultValue) {
        throw new Error(`Environment variable ${key} is required`);
    }
    return value || defaultValue;
};
console.log(process.env.JWT_SECRET);
const envConfig = {
    PORT: parseInt(getEnvVar('PORT', '3000'), 10),
    DB_URL: getEnvVar('DB_URL', 'mongodb://localhost/mydatabase'),
    NODE_ENV: getEnvVar('NODE_ENV', 'development'),
    JWT_SECRET: getEnvVar('JWT_SECRET'),
    JWT_EXPIRATION_ACCESS: getEnvVar('JWT_EXPIRATION_ACCESS'),
    JWT_EXPIRATION_REFRESH: getEnvVar('JWT_EXPIRATION_REFRESH'),
};
exports.default = envConfig;
