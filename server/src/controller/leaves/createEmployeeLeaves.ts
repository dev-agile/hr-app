import { Request, Response } from 'express';
import { EmployeeLeaves } from 'src/model/leaves';
import { sendResponse } from '@utils';
import { messages, status } from '@constants';

export const createEmployeeLeaves = async (req: Request, res: Response) => {
    try {
      const { user_id, holidaysPending } = req.body;
  
      // Validate input
      if (!user_id || typeof holidaysPending !== 'number') {
        return sendResponse(res, status.bad_request, messages.bad_request, null);
      }
  
      // Check if an entry for this user already exists
      const existingLeaves = await EmployeeLeaves.findOne({ user_id });
  
      if (existingLeaves) {
        return sendResponse(res, status.bad_request, messages.already_exists, null);
      }
  
      // Create new EmployeeLeaves document
      const newEmployeeLeaves = new EmployeeLeaves({
        user_id,
        holidaysPending
      });
  
      // Save to database
      const savedEmployeeLeaves = await newEmployeeLeaves.save();
  
      return sendResponse(res, status.created, messages.success, savedEmployeeLeaves);
    } catch (error) {
      console.error('Error in createEmployeeLeaves:', error);
      return sendResponse(res, status.internal_server_error, messages.internal_server_error, null);
    }
  };
  