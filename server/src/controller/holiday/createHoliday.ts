import { Request, Response } from 'express';
import Holiday, { IHoliday } from "../../model/holiday/holiday";
import { sendResponse } from '@utils';
import { messages, status } from '@constants';

// Create a holiday
export const createHoliday = async (req: Request, res: Response) => {
  try {
    const newHoliday: IHoliday = new Holiday(req.body);
    await newHoliday.save();
    return sendResponse(res, status.created, messages.success, newHoliday);
  } catch (error) {
    return sendResponse(res, status.internal_server_error, messages.internal_server_error, null);
  }
};