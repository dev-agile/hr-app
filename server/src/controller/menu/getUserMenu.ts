import { Request, Response } from 'express';
import UserMenu from '../../model/UserMenu'; // Adjust the import path based on your project structure
import { sendResponse } from '@utils';
import { status, messages } from '@constants';

export const getUserMenu = async (req: Request, res: Response): Promise<void> => {
  const { user_id } = req.body; // Extract user_id from the request body

  try {
    const userMenu = await UserMenu.findOne({ user_id });

    if (!userMenu) {
      return sendResponse(res, status.not_found, messages.employee_not_found, null);
    }

    return sendResponse(res, status.ok, messages.success, userMenu);
  } catch (error) {
    console.error('Error fetching user menu:', error);
    return sendResponse(res, status.internal_server_error, messages.internal_server_error, null);
  }
};
