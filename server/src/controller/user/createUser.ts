import User from "../../model/user-role";
import Role from '../../model/Role';
import { access, refresh } from '../../utils/token-genretor';
import { Request, Response } from 'express';
import { messages, status } from '@constants';
import { sendResponse, bcrypt } from '@utils';
import { v4 as uuidv4 } from 'uuid';
import { employeeModel } from "@model";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email_address, password, roleName } = req.body;
    const role = await Role.findOne({ name: roleName });
    if (!role) {
      return sendResponse(res, status.not_found, null, 'Role not found');
    }
    const hashedPassword = await bcrypt.hash(password);
    const user = new User({ user_id:uuidv4(), email_address, password: hashedPassword, role: role._id });
    await user.save();
    const employees = await employeeModel.Employee.create({employee_id:user.user_id});
    const accessToken = access(user.user_id, role);
    const refreshToken = refresh(user.user_id, role);
    sendResponse(res, status.ok, { user, accessToken, refreshToken }, messages.USER_CREATED);
  } catch (error:any) {
    sendResponse(res, status.internal_server_error, null, error.message);
  }
};


