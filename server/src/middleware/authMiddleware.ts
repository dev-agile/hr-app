import { Request, Response, NextFunction } from 'express';
import { messages, ROLES, status } from '@constants';
import { CustomError } from '@utils';
import jwt from 'jsonwebtoken';
import User from '../model/user-role';
import { envConfig } from '../config';
import { IRole } from 'src/model/Role';

interface AuthRequest extends Request {
  userId?: string;
  role?: string;
}
export const authorizeFeature = (feature: string, requiredPermissions: string[]) => {
    return async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
      try {
        console.log("User id is",req.body.userId);
        const user = await User.findOne({ user_id: req.body.userId }).populate<{ role: IRole }>('role');
        if (!user) {
          throw new CustomError(status.unauthorized, messages.USER_NOT_FOUND);
        }
  
        const role = user.role as IRole; // Cast to 'IRole' to access populated fields
  
        const featurePermissions = role.featurePermissions.find(fp => fp.feature === feature);
        if (!featurePermissions) {
          throw new CustomError(status.forbidden, messages.unauthorized);
        }
  
        const hasPermission = requiredPermissions.every(permission => 
          featurePermissions.permissions.includes(permission)
        );
        if (!hasPermission) {
          throw new CustomError(status.forbidden, messages.unauthorized);
        }
  
        next();
      } catch (error) {
        next(error);
      }
    };
  };
  