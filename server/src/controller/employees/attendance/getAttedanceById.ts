import { Request, Response } from 'express';
import { sendResponse } from '@utils';
import { messages, status } from '@constants';
import moment from 'moment';
import { Attendance } from 'src/model/employees';
import Holiday from 'src/model/holiday/holiday';

const getAttendanceById = async (request: Request, response: Response) => {
  const { id, startDate, endDate } = request.body;

  if (!id || !startDate || !endDate) {
    return sendResponse(response, status.bad_request, 'Missing required parameters', null);
  }

  try {
    const startMoment = moment(startDate, 'YYYY-MM-DD');
    const endMoment = moment(endDate, 'YYYY-MM-DD');
    
    if (!startMoment.isValid() || !endMoment.isValid()) {
      return sendResponse(response, status.bad_request, 'Invalid date format', null);
    }

    console.log(`Fetching attendance for user_id: ${id}, from: ${startMoment.format('YYYY-MM-DD')} to: ${endMoment.format('YYYY-MM-DD')}`);

    let attendanceArray = [];

    // Loop through each month in the date range
    for (let m = moment(startMoment); m.isBefore(endMoment) || m.isSame(endMoment, 'month'); m.add(1, 'month')) {
      const monthStart = m.clone().startOf('month');
      const monthEnd = m.clone().endOf('month');
      const queryStart = moment.max(monthStart, startMoment);
      const queryEnd = moment.min(monthEnd, endMoment);

      const attendanceEvents = await Attendance.find({
        user_id: id,
        date: {
          $gte: queryStart.format('DD-MM-YYYY'),
          $lte: queryEnd.format('DD-MM-YYYY')
        }
      }).sort({ date: 1 });

      const holidays = await Holiday.find({
        date: {
          $gte: queryStart.format('DD-MM-YYYY'),
          $lte: queryEnd.format('DD-MM-YYYY')
        }
      });

      const daysInRange = queryEnd.diff(queryStart, 'days') + 1;

      for (let i = 0; i < daysInRange; i++) {
        const currentDate = moment(queryStart).add(i, 'days').format('YYYY-MM-DD');
        const dayOfWeek = moment(currentDate, 'YYYY-MM-DD').format('dddd');
        const isWeekend = dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';

        const attendanceRecord = attendanceEvents.find((event) =>
          moment(event.date, 'DD-MM-YYYY').format('YYYY-MM-DD') === currentDate
        );
        const holidayRecord = holidays.find((holiday) => moment(holiday.date).format('YYYY-MM-DD') === currentDate);

        // Set dayType to "Holiday" if a holiday is found
        const dayType = holidayRecord ? holidayRecord.name : (isWeekend ? 'Weekends' : 'Working');
        const workingHours = attendanceRecord
          ? parseFloat(attendanceRecord.working_hours.split(':')[0]) +
            parseFloat(attendanceRecord.working_hours.split(':')[1]) / 60
          : (holidayRecord ? 0 : (isWeekend ? 0 : 8));

        attendanceArray.push({
          date: currentDate,
          checkIn: attendanceRecord ? formatCheckInOut(currentDate, attendanceRecord.check_in) : null,
          checkOut: attendanceRecord ? formatCheckInOut(currentDate, attendanceRecord.check_out) : null,
          day: dayOfWeek,
          dayType: dayType,
          workingHours: workingHours.toFixed(2),
        });
      }
    }

    return sendResponse(response, status.ok, messages.success, attendanceArray);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return sendResponse(response, status.internal_server_error, messages.internal_server_error, null);
  }
};

// Function to format check-in and check-out times
const formatCheckInOut = (date:any, time:any) => {
  if (!time) return null;
  return moment(`${date}T${time}`, 'YYYY-MM-DDTHH:mm').format('YYYY-MM-DDTHH:mm:ss');
};

export default getAttendanceById;