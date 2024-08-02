import { Request, Response } from 'express';
import { Attendance } from '../../../model/employees'; // Adjust the import based on your project structure
import { sendResponse } from '@utils';
import { status, messages } from '@constants';

export const editAttendance = async (req: Request, res: Response): Promise<void> => {
    console.log(req.body)
  const { attendance_id, user_id, date, check_in, check_out, status: attendanceStatus, working_hours } = req.body;

  try {
    const attendance = await Attendance.findOne({ _id: attendance_id });

    if (!attendance) {
      return sendResponse(res, status.not_found, messages.attendance_not_found, null);
    }

    // Only update fields that are provided
    if (user_id) attendance.user_id = user_id;
    if (date) attendance.date = date;
    if (check_in) attendance.check_in = check_in;
    if (check_out) attendance.check_out = check_out;
    if (attendanceStatus) attendance.status = attendanceStatus;
    if (working_hours) attendance.working_hours = working_hours;

    await attendance.save();

    return sendResponse(res, status.ok, messages.attendance_updated, attendance);
  } catch (error) {
    console.error('Error editing attendance:', error);
    return sendResponse(res, status.internal_server_error, messages.internal_server_error, null);
  }
};