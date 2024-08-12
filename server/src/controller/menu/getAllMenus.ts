import { Request, Response } from 'express';
import Menu from '../../model/Menu'; // Adjust the import path based on your project structure
import { sendResponse } from '@utils';
import { status, messages } from '@constants';

export const getAllMenus = async (req: Request, res: Response): Promise<void> => {
  try {
    const menus = await Menu.find().populate('childrens');

    return sendResponse(res, status.ok, messages.success, menus);
  } catch (error) {
    console.error('Error fetching menus:', error);
    return sendResponse(res, status.internal_server_error, messages.internal_server_error, null);
  }
};
