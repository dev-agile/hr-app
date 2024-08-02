import { Request, Response } from 'express';
import { employeeModel } from '@model';
import moment from 'moment';
import { CustomError, sendResponse } from '@utils';
import { messages, status } from '@constants';
import { AttendanceStatus } from '@enums';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  userId: string;
  role: string;
}

const checkIn = async (req: Request, res: Response) => {
 const{token}=req.body

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    const { userId } = decoded;

    const date = moment().format('DD-MM-YYYY');
    const formattedTime = moment().format('HH:mm');

    let attendance = await employeeModel.Attendance.findOne({ user_id: userId, date });

    if (attendance) {
      throw new CustomError(status.bad_request, messages.attendance_checked_found);
    }

    const newAttendance = {
      user_id: userId,
      date,
      check_in: formattedTime,
      status: AttendanceStatus.CheckOut,
    };

    const createdAttendance = await employeeModel.Attendance.create(newAttendance);
    sendResponse(res, status.created, messages.attendance_checked_in, formattedTime);
  } catch (error) {
    console.error('Error during check-in:', error);
    sendResponse(res, status.internal_server_error, messages.internal_server_error, null);
  }
};

export default checkIn;