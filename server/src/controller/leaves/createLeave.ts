// src/controllers/leaves/createLeave.ts

import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Leaves } from 'src/model/leaves';
import { sendResponse } from '@utils';
import { messages, status } from '@constants';

export const createLeave = async (req: Request, res: Response) => {
  try {
    const { user_id, holidayType, description, duration, document, leaveDate } = req.body;

    // Validate input
    if (!user_id || !holidayType || !duration || !document || !leaveDate) {
      return sendResponse(res, status.bad_request, messages.bad_request, null);
    }

    // Generate a unique leave_id using uuidv4
    const leave_id = uuidv4();

    // Create new Leave document
    const newLeave = new Leaves({
      leave_id,
      user_id,
      holidayType,
      description,
      duration,
      document,
      leaveDate: new Date(leaveDate),
      status: 'Pending',  // Default status
      isActive: true      // Default isActive
    });

    // Save to database
    const savedLeave = await newLeave.save();

    return sendResponse(res, status.created, messages.leave_created, savedLeave);
  } catch (error) {
    console.error('Error in createLeave:', error);
    return sendResponse(res, status.internal_server_error, messages.internal_server_error, null);
  }
};