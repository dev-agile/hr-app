import { Request, Response } from 'express';
import { employeeModel } from '@model';
import { sendResponse } from '@utils';
import { status, messages } from '@constants';
import paginate from '@plugin';

const listInactive = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, page_size = 5 } = req.query;

    const query = { isActive: false };
    const options = {
      pageNumber: Number(page),
      pageSize: Number(page_size),
      sort: { first_name: 1 } // Sort by first name ascending, you can change this as needed
    };

    const data = await paginate.paginate(employeeModel.Employee, query, options);

    sendResponse(res, status.ok, messages.success, data);
  } catch (error) {
    console.error('Error fetching inactive employee list:', error);
    sendResponse(res, status.internal_server_error, messages.internal_server_error, null);
  }
};

export default listInactive;