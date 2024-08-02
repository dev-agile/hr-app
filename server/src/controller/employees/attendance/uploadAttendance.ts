import { Request, Response } from 'express';
import csv from 'csv-parser';
import fs from 'fs';
import { sendResponse } from '@utils';
import { status } from '@constants';
import Attendance from '../../../model/employees/attendance';

export const uploadAttendance = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    return sendResponse(res, status.bad_request, 'No file uploaded', null);
  }

  const filePath = req.file.path;
  const attendanceData: Array<{
    employee_id: string;
    date: string;
    checkin: string;
    checkout: string;
    status: string;
    working_hours: string;
  }> = [];

  try {
    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          attendanceData.push({
            employee_id: row.employee_id,
            date: row.date,
            checkin: row.checkin,
            checkout: row.checkout,
            status: row.status,
            working_hours: row.working_hours,
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });

    for (const record of attendanceData) {
      const { employee_id, date, checkin, checkout, status, working_hours } = record;

      // Check if attendance for this employee on this date already exists
      const existingAttendance = await Attendance.findOne({ user_id: employee_id, date });
      if (existingAttendance) {
        console.log(`Attendance already marked for employee_id: ${employee_id} on date: ${date}. Skipping.`);
        continue; // Skip this record
      }

      const attendance = new Attendance({
        user_id: employee_id,
        date,
        check_in: checkin,
        check_out: checkout,
        status,
        working_hours,
      });

      await attendance.save();
    }

    fs.unlinkSync(filePath);

    return sendResponse(res, status.ok, 'CSV file processed successfully', attendanceData);
  } catch (error) {
    console.error('Error processing CSV file:', error);
    return sendResponse(res, status.internal_server_error, 'Error processing CSV file', null);
  }
};