import User from "../../model/user-role";
import { Request, Response } from 'express';
import { messages, status } from '@constants';
import { sendResponse } from '@utils';
import { Employee } from "src/model/employees";

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params; // Assuming the user_id is passed as a URL parameter


    const user = await User.findOne({ user_id }).populate('role');
    const employee=await Employee.findOne({employee_id:user_id});
    const data={user,employee};

    if (!user) {
      return sendResponse(res, status.not_found, null, messages.USER_NOT_FOUND);
    }

    sendResponse(res, status.ok, data, messages.USER_FETCHED);
  } catch (error: any) {
    sendResponse(res, status.internal_server_error, null, error.message);
  }
};