import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { sendResponse } from '../utils';
import { status, messages } from '../constants';

interface AuthRequest extends Request {
  body: {
    _id?: string;
    role?: string;
  };
}

const accessToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendResponse(res, status.unauthorized, messages.unauthorized, null);
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = verifyAccessToken(token) as { userId: string; role: string };
    req.body._id = payload.userId; // Attach userId to the request object for further use
    req.body.role = payload.role;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return sendResponse(res, status.unauthorized, messages.token_expired, null);
    } else {
      return sendResponse(res, status.unauthorized, messages.invalid_token, null);
    }
  }
};

export default accessToken;
