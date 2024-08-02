import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Attendance } from '../../../model/employees'; // Adjust the import based on your project structure
import { sendResponse } from '@utils';
import { status, messages } from '@constants';
import mongoose from 'mongoose';

interface DecodedToken {
  userId: string;
  role: string;
}

export const editAttendance = async (req: Request, res: Response): Promise<void> => {
  console.log('Request body:', req.body);

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    sendResponse(res, status.unauthorized, messages.unauthorized, null);
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    const { userId, role } = decoded;
    const { attendance_id, user_id, date, check_in, check_out, status: attendanceStatus, working_hours } = req.body;

    console.log('Decoded token:', decoded);
    console.log('Attendance ID:', attendance_id);
    console.log('User ID:', user_id);

    if (role !== 'ADMIN' && userId !== user_id) {
      sendResponse(res, status.forbidden, messages.forbidden, null);
      return;
    }

    const attendance = await Attendance.findById(attendance_id);

    if (!attendance) {
      sendResponse(res, status.not_found, messages.attendance_not_found, null);
      return;
    }

    // Only update fields that are provided
    if (user_id) attendance.user_id = user_id;
    if (date) attendance.date = date;
    if (check_in) attendance.check_in = check_in;
    if (check_out) attendance.check_out = check_out;
    if (attendanceStatus) attendance.status = attendanceStatus;
    if (working_hours) attendance.working_hours = working_hours;

    await attendance.save();

    sendResponse(res, status.ok, messages.attendance_updated, attendance);
  } catch (error) {
    console.error('Error editing attendance:', error);
    sendResponse(res, status.internal_server_error, messages.internal_server_error, null);
  }
};
