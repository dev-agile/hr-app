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
    
    // Check if the role exists
    const role = await Role.findOne({ name: roleName });
    if (!role) {
      return sendResponse(res, status.not_found, { userCreated: false }, 'Role not found');
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email_address });
    if (existingUser) {
      return sendResponse(res, status.forbidden, { userCreated: false }, 'User already exists');
    }

    // Create the user
    const hashedPassword = await bcrypt.hash(password);
    const user = new User({ user_id: uuidv4(), email_address, password: hashedPassword, role: role._id });
    await user.save();

    // Create the employee
    const employee = await employeeModel.Employee.create({ employee_id: user.user_id });

    // Generate tokens
    const accessToken = access(user.user_id, role);
    const refreshToken = refresh(user.user_id, role);

    sendResponse(res, status.created, { 
      userCreated: true, 
      user, 
      employee,
      accessToken, 
      refreshToken 
    }, messages.USER_CREATED);

  } catch (error: any) {
    sendResponse(res, status.internal_server_error, { userCreated: false }, error.message);
  }
};