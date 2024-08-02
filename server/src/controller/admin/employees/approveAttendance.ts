import { Request, Response } from 'express';
import { Attendance } from '../../../model/employees'; // Adjust the import based on your project structure
import { sendResponse } from '@utils';
import { status, messages } from '@constants';

export const approveAttendance = async (req: Request, res: Response): Promise<void> => {
  const { attendance_id, approve } = req.body;

  try {
    const attendance = await Attendance.findById(attendance_id);

    if (!attendance) {
      return sendResponse(res, status.not_found, messages.attendance_not_found, null);
    }

    if (attendance.approval_status !== 'pending') {
      return sendResponse(res, status.bad_request, messages.no_pending_changes, null);
    }

    if (approve) {
      // Apply pending changes
      attendance.check_in = attendance.pending_changes.check_in || attendance.check_in;
      attendance.check_out = attendance.pending_changes.check_out || attendance.check_out;
      attendance.status = attendance.pending_changes.status || attendance.status;
      attendance.working_hours = attendance.pending_changes.working_hours || attendance.working_hours;
      attendance.approval_status = 'approved';
      attendance.pending_changes = {};
    } else {
      // Reject changes
      attendance.approval_status = 'rejected';
      attendance.pending_changes = {};
    }

    await attendance.save();

    return sendResponse(res, status.ok, approve ? messages.attendance_approved : messages.attendance_rejected, attendance);
  } catch (error) {
    console.error('Error approving attendance:', error);
    return sendResponse(res, status.internal_server_error, messages.internal_server_error, null);
  }
};