import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { resCustom } from '../utils';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../constants';

interface AuthRequest extends Request {
  userId?: string;
}

const accessToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
     return  resCustom(res,HTTP_STATUS.UNAUTHORIZED,RESPONSE_MESSAGES.UNAUTHORIZED,null)

  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = verifyAccessToken(token);
    req.userId = payload.userId; // Attach userId to the request object for further use
    next();
  } catch (error) {
    return  resCustom(res,HTTP_STATUS.UNAUTHORIZED,"invalid token",null)
  }
};

export default accessToken