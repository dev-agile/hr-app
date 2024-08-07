import { Request, Response, NextFunction } from 'express';
import { employeeModel, UsersRole } from '@model';
import { sendResponse, bcrypt, tokenGenerator, CustomError } from '@utils';
import { status, messages } from '@constants';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email_address, password } = req.body;
    console.log(email_address, password);

    const user = await UsersRole.findOne({ email_address: email_address });

    if ( !user) {
      throw new CustomError(status.not_found, messages.not_found);
    }

    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
      return sendResponse(res, status.unauthorized, messages.unauthorized, null);
    }

    // Ensure employee_id is a string or use a fallback
    const employeeId = user.user_id?.toString() || "";
    console.log(employeeId);

    const accessToken = tokenGenerator.access(employeeId, user.role);
    const refreshToken = tokenGenerator.refresh(employeeId, user.role);

    sendResponse(res, status.ok, messages.success, {
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

export default login;