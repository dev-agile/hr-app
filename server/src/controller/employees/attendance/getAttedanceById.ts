import { Request, Response } from 'express';
import { sendResponse } from '@utils';
import { messages, status } from '@constants';
import moment from 'moment';
import { Attendance } from 'src/model/employees';

const getAttendanceById = async (request: Request, response: Response) => {
  const { id, month, year } = request.body;

  if (!id || !month || !year) {
    return sendResponse(response, status.bad_request, 'Missing required parameters', null);
  }

  try {
    const formattedMonth = String(month).padStart(2, '0');
    const formattedYear = String(year);

    // Adjust date format for the query
    const startDate = moment(`01-${formattedMonth}-${formattedYear}`, 'DD-MM-YYYY').startOf('month');
    const endDate = moment(startDate).endOf('month');

    console.log(`Fetching attendance for user_id: ${id}, from: ${startDate.format('YYYY-MM-DD')}, to: ${endDate.format('YYYY-MM-DD')}`);

    const attendanceEvents = await Attendance.find({
      user_id: id,
      $expr: {
        $and: [
          { $gte: [{ $dateFromString: { dateString: '$date', format: '%d-%m-%Y' } }, startDate.toDate()] },
          { $lte: [{ $dateFromString: { dateString: '$date', format: '%d-%m-%Y' } }, endDate.toDate()] },
        ],
      },
    }).sort({ date: 1 });

    // Generate an array for the month
    const daysInMonth = endDate.date(); // Number of days in the month
    const attendanceArray = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = moment(startDate).date(i).format('DD-MM-YYYY');
      const dayOfWeek = moment(currentDate, 'DD-MM-YYYY').format('dddd');
      const isWeekend = dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';

      const attendanceRecord = attendanceEvents.find((event) => moment(event.date, 'DD-MM-YYYY').format('DD-MM-YYYY') === currentDate);

      attendanceArray.push({
        date: currentDate,
        checkIn: attendanceRecord ? attendanceRecord.check_in : null,
        checkOut: attendanceRecord ? attendanceRecord.check_out : null,
        day: dayOfWeek, // Get day name
        dayType: isWeekend ? 'Weekends' : 'Working',
        workingHours: attendanceRecord ? attendanceRecord.working_hours : (isWeekend ? 0 : 8), // Use attendance working hours if available
      });
    }

    return sendResponse(response, status.ok, messages.success, attendanceArray);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return sendResponse(response, status.internal_server_error, messages.internal_server_error, null);
  }
};

export default getAttendanceById;
