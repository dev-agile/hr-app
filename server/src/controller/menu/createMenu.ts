import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid'; // Import the UUID function
import Menu from '../../model/Menu'; // Adjust the import path based on your project structure
import { sendResponse } from '@utils';
import { status, messages } from '@constants';

export const createMenu = async (req: Request, res: Response): Promise<void> => {
  const { name, icon, tooltip, description, url, sortOrder, ParentId, subMenu, isMenu } = req.body;

  try {
    const newMenu = new Menu({
      menu_id: uuidv4(), // Generate a unique menu_id
      name,
      icon,
      tooltip,
      description,
      url,
      sortOrder,
      ParentId, // Optional field
      subMenu,
      isMenu
    });

    await newMenu.save();

    return sendResponse(res, status.created, messages.success, newMenu);
  } catch (error) {
    console.error('Error creating menu:', error);
    return sendResponse(res, status.internal_server_error, messages.internal_server_error, null);
  }
};
