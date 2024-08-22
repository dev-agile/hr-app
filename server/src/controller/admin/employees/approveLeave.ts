import { Request, Response } from 'express';
import { sendResponse } from '@utils';
import { status, messages } from '@constants';
import { Leaves } from 'src/model/leaves';
import { EmployeeLeaves } from 'src/model/leaves';

export const approveLeave = async (req: Request, res: Response) => {
  try {
    const { leave_id } = req.params;

    // Find the leave request
    const leave = await Leaves.findOne({ leave_id });

    if (!leave) {
      return sendResponse(res, status.not_found, messages.leave_not_found, null);
    }

    // Check if the leave is already approved or rejected
    if (leave.status !== 'Pending') {
      return sendResponse(res, status.bad_request, messages.leave_already_processed, null);
    }

    // Update the leave status to 'Accepted'
    leave.status = 'Accepted';

    // Calculate the number of days to deduct
    let daysToDeduct = leave.duration;
    if (leave.holidayType === 'Half Day') {
      daysToDeduct = 0.5;
    }

    // Find the EmployeeLeaves record for this user
    const employeeLeaves = await EmployeeLeaves.findOne({ user_id: leave.user_id });

    if (!employeeLeaves) {
      return sendResponse(res, status.not_found, messages.employee_leaves_not_found, null);
    }

    // Check if employee has enough leave balance
    if (employeeLeaves.holidaysPending < daysToDeduct) {
      return sendResponse(res, status.bad_request, messages.insufficient_leave_balance, null);
    }

    // Update the holidaysPending in EmployeeLeaves
    employeeLeaves.holidaysPending -= daysToDeduct;

    // Save both updated documents
    const [updatedLeave, updatedEmployeeLeaves] = await Promise.all([
      leave.save(),
      employeeLeaves.save()
    ]);

    // Prepare the response data
    const responseData = {
      updatedLeave,
      updatedLeaveBalance: updatedEmployeeLeaves.holidaysPending
    };

    return sendResponse(res, status.ok, messages.leave_approved, responseData);
  } catch (error) {
    console.error('Error in approveLeave:', error);
    return sendResponse(res, status.internal_server_error, messages.internal_server_error, null);
  }
};