import { Request, Response } from 'express';
import { employeeModel, UsersRole } from '@model';
import { sendResponse } from '@utils';
import { status, messages } from '@constants';

export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  const { employee_id } = req.body;

  if (!employee_id) {
    return sendResponse(res, status.bad_request, 'Employee ID is required', null);
  }

  try {
    const employee = await employeeModel.Employee.findOne({ employee_id });

    if (!employee) {
      return sendResponse(res, status.not_found, messages.employee_not_found, null);
    }

    await employeeModel.Employee.deleteOne({ employee_id });
    await UsersRole.deleteOne({ user_id: employee._id });

    return sendResponse(res, status.ok, messages.employee_deleted, null);
  } catch (error) {
    console.error('Error deleting employee:', error);
    return sendResponse(res, status.internal_server_error, messages.internal_server_error, null);
  }
};