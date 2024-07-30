import jwt from 'jsonwebtoken';
import { envConfig } from '../../config';

interface TokenPayload {
    userId: string;
    role:string
   
  }

export const verifyAccessToken = (token: string): TokenPayload => {
    return jwt.verify(token, envConfig.JWT_SECRET) as TokenPayload;
  };
  
  export const verifyRefreshToken = (token: string): TokenPayload => {
    return jwt.verify(token, envConfig.JWT_SECRET) as TokenPayload;
  };
  
  export const decodeToken = (token: string): any => {
    return jwt.decode(token);
  };