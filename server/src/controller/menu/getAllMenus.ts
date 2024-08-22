import { Request, Response } from 'express';
import Menu from '../../model/Menu'; // Adjust the import path based on your project structure
import { sendResponse } from '@utils';
import { status, messages } from '@constants';

export const getAllMenus = async (req: Request, res: Response): Promise<void> => {
  try {
    const menus = await Menu.find();

    // Create a map to hold menu items by their menu_id for quick lookup
    const menuMap = new Map();

    // Populate the map with menu items
    menus.forEach(menu => {
      menu.children = []; // Initialize children array for each menu item
      menuMap.set(menu.menu_id, menu);
    });

    // Array to hold the top-level menu items
    const rootMenus: any[] = [];

    // Iterate over the menus to build the hierarchy
    menus.forEach(menu => {
      if (menu.ParentId === '0') {
        // If ParentId is '0', it's a root menu item
        rootMenus.push(menu);
      } else {
        // Find the parent menu item using the ParentId
        const parentMenu = menuMap.get(menu.ParentId);
        if (parentMenu) {
          // Add the current menu item to the parent's children array
          parentMenu.children.push(menu);
        } else {
          console.warn(`Parent not found for menu item: ${menu.name} with ParentId: ${menu.ParentId}`);
        }
      }
    });

    // Send the hierarchical structure as the response
    return sendResponse(res, status.ok, messages.success, rootMenus);
  } catch (error) {
    console.error('Error fetching menus:', error);
    return sendResponse(res, status.internal_server_error, messages.internal_server_error, null);
  }
};