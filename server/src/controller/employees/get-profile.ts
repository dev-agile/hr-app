import { Request, Response, NextFunction } from 'express';
import { employeeModel } from '@model';
import { CustomError, sendResponse } from '@utils';
import { status, messages } from '@constants';
interface AuthRequest extends Request {
  _id?: string;
}
const getProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const { _id } = req.body;

  const employee = await employeeModel.Employee.findById({ _id });

  if (!employee) {
    throw new CustomError(status.not_found, messages.employee_not_found);
  }

  sendResponse(res, status.ok, messages.success, employee);
};

export default getProfile;
