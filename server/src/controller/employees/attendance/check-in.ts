import { Request, Response } from 'express';
import { employeeModel } from '@model';
import moment from 'moment';
import { CustomError, sendResponse } from '@utils';
import { messages, status } from '@constants';
import { AttendanceStatus } from '@enums';



 const checkIn = async (req: Request, res: Response) => {
 
    const { _id } = req.body;
  
    
    const date = moment().format('DD-MM-YYYY');
    const formattedTime =  moment().format('HH:mm'); 

    let attendance = await employeeModel.Attendance.findOne({ user_id:_id, date });

    if (attendance) {
         throw new CustomError(status.bad_request,messages.attendance_checked_found)
     
    }

    const newAttendance = {
      user_id:_id,
      date,
      check_in: formattedTime,
      status: AttendanceStatus.CheckOut,
    };

    const createdAttendance = await employeeModel.Attendance.create(newAttendance);
    sendResponse(res,status.created,messages.attendance_checked_in,formattedTime)

};

export default checkIn
