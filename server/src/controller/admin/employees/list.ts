import { Request, Response } from 'express';
import { employeeModel } from '@model';
import { sendResponse } from '@utils';
import { status, messages } from '@constants';
import paginate from '@plugin';

const list = async (req: Request, res: Response): Promise<void> => {
  const query = { isActive: true };
  const data = await paginate.paginate(employeeModel.Employee, query);

  sendResponse(res, status.ok, messages.success, data);
};

export default list;