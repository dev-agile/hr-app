import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { employeeModel } from '@model';
import moment from 'moment';
import { CustomError, sendResponse } from '@utils';
import { messages, status } from '@constants';
import { AttendanceStatus } from '@enums';

interface DecodedToken {
  userId: string;
  role: string;
}

const checkOut = async (req: Request, res: Response) => {
const {token}=req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    const { userId } = decoded;

    const date = moment().format('DD-MM-YYYY');
    const formattedTime = moment().format('HH:mm');

    console.log(userId, date);

    const attendance = await employeeModel.Attendance.findOne({
      user_id: userId,
      date,
    });

    if (!attendance) {
      throw new CustomError(status.bad_request, messages.attendance_check_not_found);
    }

    if (attendance.check_out) {
      throw new CustomError(status.bad_request, messages.attendance_checked_out_found);
    }

    const checkInTime = moment(attendance.check_in, 'HH:mm');
    const checkOutTime = moment(formattedTime, 'HH:mm');
    const durationHours = checkOutTime.diff(checkInTime, 'hours');
    const durationMinutes = checkOutTime.diff(checkInTime, 'minutes') % 60;
    attendance.check_out = formattedTime;
    attendance.status = AttendanceStatus.CheckOut;
    attendance.working_hours = `${durationHours}:${durationMinutes}`;

    const duration = `${durationHours} hours ${durationMinutes} minutes`;
    console.log(duration);

    await attendance.save();
    sendResponse(res, status.created, messages.attendance_checked_out, formattedTime);
  } catch (error) {
    console.error('Error during check-out:', error);
    sendResponse(res, status.internal_server_error, messages.internal_server_error, null);
  }
};

export default checkOut;