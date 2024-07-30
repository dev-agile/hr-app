import { Request, Response, NextFunction } from 'express';
import { messages, ROLES, status } from '@constants';
import { CustomError } from '@utils';

interface AuthRequest extends Request {
  userId?: string;
  role?: string;
}

const adminToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  if (req.body.role === ROLES.ADMIN) {
    next();
  } else {
    throw new CustomError(
      status.unauthorized,
      messages.unauthorized,
    );
  }
};

export default adminToken;
