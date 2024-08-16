import User from "../../model/user-role";
import Role from '../../model/Role';
import { access, refresh } from '../../utils/token-genretor';
import { Request, Response } from 'express';
import { messages, status } from '@constants';
import { sendResponse, bcrypt } from '@utils';
import { v4 as uuidv4 } from 'uuid';
export const getUsers = async (req: Request, res: Response) => {
    try {
      const users = await User.find().populate('role');
      sendResponse(res, status.ok, users, messages.USERS_FETCHED);
    } catch (error:any) {
      sendResponse(res, status.internal_server_error, null, error.message);
    }
  };