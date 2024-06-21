import jwt from 'jsonwebtoken';

import { envConfig } from '../config';



// Function to generate JWT access token
export const generateAccessToken = (userId: string): string => {
    return jwt.sign({ userId }, envConfig.JWT_SECRET, { expiresIn: envConfig.JWT_EXPIRATION_ACCESS });
};

// Function to generate JWT refresh token
export const generateRefreshToken = (userId: string): string => {
    return jwt.sign({ userId }, envConfig.JWT_SECRET, { expiresIn: envConfig.JWT_EXPIRATION_REFRESH });
};


