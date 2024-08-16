import jwt from 'jsonwebtoken';

import { envConfig } from '../config';



// Function to generate JWT access token
export const access = (userId: string,role:any): string => {
    return jwt.sign({ userId,role }, envConfig.JWT_SECRET, { expiresIn: envConfig.JWT_EXPIRATION_ACCESS });
};

// Function to generate JWT refresh token
export const refresh = (userId: string,role:any): string => {
    return jwt.sign({ userId,role }, envConfig.JWT_SECRET, { expiresIn: envConfig.JWT_EXPIRATION_REFRESH });
};


