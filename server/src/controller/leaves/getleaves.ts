import { Request, Response } from 'express';
import { EmployeeLeaves } from 'src/model/leaves';
import { sendResponse } from '@utils';
import { messages, status } from '@constants';

export const getEmployeeLeaves = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;

    // Validate input
    if (!user_id) {
      return sendResponse(res, status.bad_request, messages.bad_request, null);
    }

    // Find employee leaves by user_id
    const employeeLeaves = await EmployeeLeaves.findOne({ user_id });

    if (!employeeLeaves) {
      return sendResponse(res, status.not_found, messages.not_found, null);
    }

    return sendResponse(res, status.ok, messages.success, employeeLeaves);
  } catch (error) {
    console.error('Error in getEmployeeLeaves:', error);
    return sendResponse(res, status.internal_server_error, messages.internal_server_error, null);
  }
};

// If you want to get all employee leaves (for admin purposes, for example)
export const getAllEmployeeLeaves = async (req: Request, res: Response) => {
  try {
    const allEmployeeLeaves = await EmployeeLeaves.find();

    return sendResponse(res, status.ok, messages.success, allEmployeeLeaves);
  } catch (error) {
    console.error('Error in getAllEmployeeLeaves:', error);
    return sendResponse(res, status.internal_server_error, messages.internal_server_error, null);
  }
};