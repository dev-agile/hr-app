// src/controller/leaves/getAllLeaves.ts

import { Request, Response } from 'express';
import { Leaves } from 'src/model/leaves';
import { sendResponse } from '@utils';
import { messages, status } from '@constants';

export const getAllLeaves = async (req: Request, res: Response) => {
  try {
    // You can add pagination here if needed
    console.log("Yahan aaraha hai");
    const leaves = await Leaves.find().sort({ leaveDate: -1 });

    return sendResponse(res, status.ok, messages.success, leaves);
  } catch (error) {
    console.error('Error in getAllLeaves:', error);
    return sendResponse(res, status.internal_server_error, messages.internal_server_error, null);
  }
};