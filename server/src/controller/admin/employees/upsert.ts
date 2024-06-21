import { Request, Response } from 'express';
import { employeeModel, UserRole } from '../../../model';
import { resCustom } from '../../../utils';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../../../constants';
import { ROLES } from '../../../constants';
import { hashPassword } from '../../../utils/bcrypt';
import { employeeRegister } from '../../../validation/employees';

// POST /employees/create
const usert = async (req: Request, res: Response): Promise<void> => {
 
    const {
      id,
      first_name,
      last_name,
      position,
      department,
      salary,
      aadhar_image,
      pan_image,
      qualification_images,
      email,
      password
    } = req.body;

    let employee;
   

    const hashedPassword = await hashPassword(password);

    const { error, value } = employeeRegister.validate(req.body, { abortEarly: false });

    if (error) {
    
      const errorMessages = error.details.map((err) => ({
        field: err.path[0],
        message: err.message,
      }));
      return   resCustom(res,HTTP_STATUS.NOT_ACCEPTABLE, errorMessages, null);
    }
    

    if (id) {
      // Update existing employee
      employee = await employeeModel.Employee.default.findOneAndUpdate(
        { _id: id },
        {
          first_name,
          last_name,
          position,
          department,
          salary,
          aadhar_image,
          pan_image,
          qualification_images,
          email,
          password:  hashedPassword
        },
        {
          new: true,
          runValidators: true
        }
      );
      
      if (!employee) {
        resCustom(res, HTTP_STATUS.NOT_FOUND, RESPONSE_MESSAGES.NOT_FOUND, null);
      }
    } else {

   
      employee = await employeeModel.Employee.default.create({
        first_name,
        last_name,
        position,
        department,
        salary,
        aadhar_image,
        pan_image,
        qualification_images,
        email,
        password:  hashedPassword
      });
      
      await UserRole.create({ email, role: ROLES.EMPLOYEE });
    }

    resCustom(res, HTTP_STATUS.OK, RESPONSE_MESSAGES.SUCCESS, employee);
 
};

export default usert;
