import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { sendResponse } from '@utils';
import { messages, status } from '@constants';

// Assuming Leaves is a Mongoose model
const Leaves = mongoose.model('Leaves');

export const getAllLeaves = async (req: Request, res: Response) => {
  try {
    // Use aggregation to join Leaves with Employee based on user_id and employee_id
    const leaves = await Leaves.aggregate([
      {
        $lookup: {
          from: 'employees', // The name of the Employee collection
          localField: 'user_id', // Field in the Leaves collection
          foreignField: 'employee_id', // Field in the Employee collection
          as: 'employeeDetails'
        }
      },
      {
        $unwind: '$employeeDetails' // Unwind the employee details to flatten the array
      },
      {
        $sort: { leaveDate: -1 } // Sort by leaveDate in descending order
      },
      {
        $project: {
          // Project the fields you want in the output
          _id: 1,
          leaveDate: 1,
          duration: 1,
          status: 1,
          description: 1,
          'employeeDetails.first_name': 1,
          'employeeDetails.last_name': 1,
          'employeeDetails.contact_information.email': 1, // Assuming email is nested under contact_information
          fullName: {
            $concat: ['$employeeDetails.first_name', ' ', '$employeeDetails.last_name']
          }
        }
      }
    ]);

    return sendResponse(res, status.ok, messages.success, leaves);
  } catch (error) {
    console.error('Error in getAllLeaves:', error);
    return sendResponse(res, status.internal_server_error, messages.internal_server_error, null);
  }
};