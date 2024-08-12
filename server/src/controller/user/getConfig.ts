import { Request, Response } from 'express';
import User from '../../model/user-role'; // Adjust the import path based on your project structure
import Role from '../../model/Role'; // Assuming you have a Role model
import UserMenu from '../../model/UserMenu'; // Assuming you have a UserMenu model
import Menu from '../../model/Menu'; // Assuming you have a Menu model
import { sendResponse } from '@utils';
import { status, messages } from '@constants';
import { decodeToken } from 'src/utils/jwt';
import { buildMenuHierarchy } from 'src/utils/getUserMenuHierarchy';

export const getConfigUser = async (req: Request, res: Response): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return sendResponse(res, status.unauthorized, messages.unauthorized, null);
  }

  try {
    const decoded = decodeToken(token);
    console.log(decoded);

    // Fetch user details and populate role
    const user = await User.findOne({ user_id: decoded.userId }).populate('role');

    if (!user) {
      return sendResponse(res, status.not_found, messages.employee_not_found, null);
    }

    // Fetch role and permissions
    const role = await Role.findById(user.role);
    const permissions = role ? role.featurePermissions : [];

    // Fetch user menu based on menuIds
    const userMenu = await UserMenu.findOne({ user_id: decoded.userId });
    let menus: any[] = [];
    if (userMenu) {
      menus = await Menu.find({ menu_id: { $in: userMenu.menuIds } });
    }
    const hierchuMenu=buildMenuHierarchy(menus);
    const userWithoutId = { ...user.toObject(), _id: undefined };
    const permissionsWithoutId = permissions.map((perm: any) => {
      const { _id, ...rest } = perm.toObject();
      return rest;
    });
    // const menusWithoutId = hierchuMenu.map((menu: any) => {
    //   const { _id, ...rest } = menu.toObject();
    //   rest.childrens = rest.childrens.map((child: any) => {
    //     const { _id, ...childRest } = child;
    //     return childRest;
    //   });
    //   return rest;
    // });

    const userConfig = {
      user: userWithoutId,
      menus: hierchuMenu
    };
    return sendResponse(res, status.ok, messages.success, userConfig);
  } catch (error) {
    console.error('Error fetching user config:', error);
    return sendResponse(res, status.internal_server_error, messages.internal_server_error, null);
  }
};
