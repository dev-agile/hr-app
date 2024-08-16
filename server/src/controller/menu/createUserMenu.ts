import { Request, Response } from 'express';
import UserMenu from '../../model/UserMenu'; // Adjust the import path based on your project structure
import { sendResponse } from '@utils';
import { status, messages } from '@constants';

export const createUserMenu = async (req: Request, res: Response): Promise<void> => {
  const { role_id, menuIds } = req.body;

  try {
    const existingUserMenu = await UserMenu.findOne({ role_id });

    if (existingUserMenu) {
      // Update existing user menu
      existingUserMenu.menuIds = Array.from(new Set([...existingUserMenu.menuIds, ...menuIds]));
      await existingUserMenu.save();
      return sendResponse(res, status.ok, messages.success, existingUserMenu);
    }

    // Create a new user menu
    const newUserMenu = new UserMenu({
      role_id,
      menuIds
    });

    await newUserMenu.save();

    return sendResponse(res, status.created, messages.success, newUserMenu);
  } catch (error) {
    console.error('Error creating role menu:', error);
    return sendResponse(res, status.internal_server_error, messages.internal_server_error, null);
  }
};
