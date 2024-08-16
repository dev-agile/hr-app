import { Request, Response } from 'express';
import UserMenu from '../../model/UserMenu'; // Adjust the import path based on your project structure
import Menu from '../../model/Menu'; // Ensure the import path is correct
import { sendResponse } from '@utils';
import { status, messages } from '@constants';

export const getUserMenu = async (req: Request, res: Response): Promise<void> => {
  const { role_id } = req.body; // Extract role_id from the request body

  try {
    // Find the UserMenu document for the given role_id
    const userMenu = await UserMenu.findOne({ role_id });

    if (!userMenu) {
      return sendResponse(res, status.not_found, messages.employee_not_found, null);
    }

    // Fetch all Menu documents that match the menuIds in the UserMenu document
    const menus = await Menu.find({ menu_id: { $in: userMenu.menuIds } });

    // Create a map to hold menu items by their menu_id for quick lookup
    const menuMap = new Map();

    // Populate the map with menu items
    menus.forEach(menu => {
      menu.children = []; // Initialize children array for each menu item
      menuMap.set(menu.menu_id, menu);
    });
    console.log("menuMap",menuMap)

    // Array to hold the top-level menu items
    const rootMenus:any = [];

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
    console.error('Error fetching user menu:', error);
    return sendResponse(res, status.internal_server_error, messages.internal_server_error, null);
  }
};
