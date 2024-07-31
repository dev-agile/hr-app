import { Request, Response } from 'express';
import { employeeModel, UsersRole } from '@model';
import { sendResponse, bcrypt } from '@utils';
import { status, messages, ROLES } from '@constants';
import employeesValidation from '@validation';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const upsert = async (req: Request, res: Response): Promise<void> => {
  const { employee_id, password, contact_information, skills_and_qualifications, ...rest } = req.body;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  // Construct paths for uploaded files
  console.log(req.body.first_name);
  const photoPath = files['photo']?.[0]?.filename ? path.join('uploads', files['photo'][0].filename) : undefined;
  const documentPaths = files['documents']?.map((file: Express.Multer.File) => path.join('documents', file.filename)) || [];

  // Ensure contact_information and skills_and_qualifications are objects
  const contactInfo = typeof contact_information === 'string'
    ? JSON.parse(contact_information)
    : contact_information;

  const skillsAndQualifications = typeof skills_and_qualifications === 'string'
    ? JSON.parse(skills_and_qualifications)
    : skills_and_qualifications;

  // Validate request body
  // const { error } = employeesValidation.employeesValidation.default.validate({
  //   ...rest,
  //   contact_information: contactInfo,
  //   skills_and_qualifications: skillsAndQualifications,
  //   password
  // }, { abortEarly: false });

  // if (error) {
  //   const errorMessages = error.details.map((err: any) => ({
  //     field: err.path[0],
  //     message: err.message,
  //   }));
  //   return sendResponse(res, status.not_acceptable, errorMessages, null);
  // }

  const hashedPassword = await bcrypt.hash(password);

  let employee;

  if (employee_id) {
    // Update existing employee
    employee = await employeeModel.Employee.findOneAndUpdate(
      { employee_id },
      {
        ...rest,
        password: hashedPassword,
        photo: photoPath,
        documents: documentPaths,
        contact_information: contactInfo,
        skills_and_qualifications: skillsAndQualifications,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!employee) {
      return sendResponse(res, status.not_found, messages.employee_not_found, null);
    }
    sendResponse(res, status.created, messages.employee_updated, null);
  } else {
    // Create new employee
    employee = await employeeModel.Employee.create({
      ...rest,
      employee_id: uuidv4(),
      password: hashedPassword,
      photo: photoPath,
      documents: documentPaths,
      contact_information: contactInfo,
      skills_and_qualifications: skillsAndQualifications,
      
    });

    // Create user role entry
    const userRole = await UsersRole.create({
      email_address: contactInfo.email,
      user_id: employee._id,
      role: ROLES.EMPLOYEE,
      password: hashedPassword,
    });
    sendResponse(res, status.created, messages.employee_created, null);
  }
};

export default upsert;
