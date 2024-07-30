import { Request, Response } from 'express';
import { employeeModel, UsersRole } from '@model';
import { sendResponse, bcrypt } from '@utils';
import { status, messages, ROLES } from '@constants';
import employeesValidation from '@validation';
import { v4 as uuidv4 } from 'uuid';

const upsert = async (req: Request, res: Response): Promise<void> => {
  const { _id, password, ...rest } = req.body;

  const { error } = employeesValidation.employeesValidation.default.validate(
    req.body,
    { abortEarly: false },
  );

  if (error) {
    const errorMessages = error.details.map((err: any) => ({
      field: err.path[0],
      message: err.message,
    }));
    return sendResponse(res, status.not_acceptable, errorMessages, null);
  }
  console.log(password);

  const hashedPassword = await bcrypt.hash(password);

  let employee;

  if (_id) {
    employee = await employeeModel.Employee.findOneAndUpdate(
      { _id },
      {
        ...rest,
        password: hashedPassword,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!employee) {
      return sendResponse(
        res,
        status.not_found,
        messages.employee_not_found,
        null,
      );
    }
    sendResponse(res, status.created, messages.employee_updated, null);
  } else {
    employee = await employeeModel.Employee.create({
      _id: uuidv4(),
      password: hashedPassword,
      ...rest,
    });
  
    const userRol = await UsersRole.create({
      email_address: rest.email_address,
      user_id: employee._id,
      role: ROLES.EMPLOYEE,
      password: hashedPassword,
    });
    sendResponse(res, status.created, messages.employee_created, null);
  }

  
};

export default upsert;
