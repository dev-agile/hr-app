import Joi from "joi";

const employeeRegister = Joi.object({
  id: Joi.string().optional(),
  first_name: Joi.string().required().messages({
    'any.required': 'First name is required',
    'string.empty': 'First name cannot be empty',
  }),
  last_name: Joi.string().required().messages({
    'any.required': 'Last name is required',
    'string.empty': 'Last name cannot be empty',
  }),
  position: Joi.string().required().messages({
    'any.required': 'Position is required',
    'string.empty': 'Position cannot be empty',
  }),
  department: Joi.string().required().messages({
    'any.required': 'Department is required',
    'string.empty': 'Department cannot be empty',
  }),
  salary: Joi.number().required().messages({
    'any.required': 'Salary is required',
    'number.base': 'Salary must be a number',
  }),
  aadhar_image: Joi.string().required().messages({
    'any.required': 'Aadhar image is required',
    'string.empty': 'Aadhar image cannot be empty',
  }),
  pan_image: Joi.string().required().messages({
    'any.required': 'Pan image is required',
    'string.empty': 'Pan image cannot be empty',
  }),
  qualification_images: Joi.array()
    .items(Joi.string())
    .required()
    .messages({
      'any.required': 'Qualification images are required',
      'array.base': 'Qualification images must be an array',
      'array.empty': 'Qualification images cannot be empty',
    }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.empty': 'Email cannot be empty',
    'string.email': 'Email must be a valid email address',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
    'string.empty': 'Password cannot be empty',
  }),
});

export { employeeRegister};




