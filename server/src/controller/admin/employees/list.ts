import { Request, Response } from 'express';
import { employeeModel ,UserRole} from '../../../model';
import { resCustom } from '../../../utils';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../../../constants';

import paginate from '../../../plugin/paginate';




const list = async (req: Request, res: Response): Promise<void> => {

   

    const data =  await paginate(employeeModel.Employee.default)




    resCustom(res,HTTP_STATUS.OK,RESPONSE_MESSAGES.DATA_FETCHED,data)



};

export default list;
