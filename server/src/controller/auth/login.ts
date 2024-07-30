import { Response, NextFunction, Request } from 'express';
import { employeeModel,UsersRole } from '@model';
import {sendResponse,bcrypt,tokenGenerator,CustomError} from '@utils';
import { status,messages } from '@constants';



const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email_address, password } = req.body;
  console.log(email_address,password);
  const user = await UsersRole.findOne({ email_address: email_address });
  if (!user) {
    throw  new CustomError(
      status.not_found,
      messages.not_found,
      
    );
  }


  const passCompare = bcrypt.compare(password, user.password);

  if (!passCompare) {
    sendResponse(
      res,
      status.unauthorized,
      messages.unauthorized,
      null,
    );
  }

  

  const accessToken = tokenGenerator.access(user.user_id, user.role);
  const refreshToken = tokenGenerator.refresh(user.user_id, user.role);
   sendResponse(res, status.ok, messages.success, {
    access_token: accessToken,
    refresh_token: refreshToken,
  
  });
};

export default login;
