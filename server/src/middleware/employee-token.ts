import { Request, Response, NextFunction } from 'express';
import { messages, ROLES, status } from '@constants';
import { CustomError } from '@utils';

interface AuthRequest extends Request {
  _id?: string;
  role?: string;
}

const employeeToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
    console.log(req.body);
    

  if (req.body.role === ROLES.EMPLOYEE) {
    next();
  } else {
    throw new CustomError(status.unauthorized, messages.unauthorized);
  }
};

export default employeeToken;
