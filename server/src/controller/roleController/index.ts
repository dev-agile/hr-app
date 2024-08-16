import { Request, Response } from 'express';
import Role from '../../model/Role'; // Ensure the correct relative path to your Role model
import { sendResponse } from '../../utils'; // Ensure the correct relative path to your utility functions
import { messages, status } from '../../constants'; // Ensure the correct relative path to your constants
import { v4 as uuidv4 } from 'uuid';

export const createRole = async (req: Request, res: Response) => {
  try {
    const { name, featurePermissions } = req.body;
    const role_id = uuidv4();
    const role = new Role({ role_id, name, featurePermissions });
    await role.save();
    sendResponse(res, status.ok,  messages.ROLE_CREATED,role);
  } catch (error: any) {
    sendResponse(res, status.internal_server_error, null, error.message);
  }
};

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await Role.find();
    sendResponse(res, status.ok, messages.ROLES_FETCHED,roles );
  } catch (error: any) {
    sendResponse(res, status.internal_server_error, null, error.message);
  }
};

export const editRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("Role Id",id);
    const { name, featurePermissions } = req.body;
    
    const role = await Role.findById(id);
    if (!role) {
      return sendResponse(res, status.not_found, null, messages.ROLE_NOT_FOUND);
    }

    role.name = name || role.name;
    role.featurePermissions = featurePermissions || role.featurePermissions;
    await role.save();

    sendResponse(res, status.ok, messages.ROLE_UPDATED,role );
  } catch (error: any) {
    sendResponse(res, status.internal_server_error, null, error.message);
  }
};
