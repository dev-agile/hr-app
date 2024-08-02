import { Request, Response } from 'express';
import Holiday, { IHoliday } from "../../model/holiday/holiday";
import { sendResponse } from '@utils';
import { messages, status } from '@constants';
export const updateHoliday = async (req: Request, res: Response) => {
    try {
      const holiday = await Holiday.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!holiday) {
        return sendResponse(res, status.not_found, 'Holiday not found', null);
      }
      return sendResponse(res, status.ok, messages.success, holiday);
    } catch (error) {
      return sendResponse(res, status.internal_server_error, messages.internal_server_error, null);
    }
  };