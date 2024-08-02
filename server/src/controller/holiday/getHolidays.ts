import { Request, Response } from 'express';
import Holiday, { IHoliday } from "../../model/holiday/holiday";
import { sendResponse } from '@utils';
import { messages, status } from '@constants';
export const getHolidays = async (req: Request, res: Response) => {
    try {
      const holidays = await Holiday.find();
      return sendResponse(res, status.ok, messages.success, holidays);
    } catch (error) {
      return sendResponse(res, status.internal_server_error, messages.internal_server_error, null);
    }
  };