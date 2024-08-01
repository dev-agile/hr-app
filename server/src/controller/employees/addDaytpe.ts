import { Request, Response } from 'express';
import { DayType } from 'src/model/employees';
import { sendResponse } from '@utils';
import { status, messages } from '@constants';

export const createDayType = async (req: Request, res: Response) => {
  try {
    const { Status, Description, WorkingHours } = req.body;

    const newDayType = new DayType({
      Status,
      Description,
      WorkingHours,
    });

    const savedDayType = await newDayType.save();

    return sendResponse(res, status.created, messages.success, savedDayType);
  } catch (error) {
    return sendResponse(res, status.internal_server_error, messages.internal_server_error, null);
  }
};
