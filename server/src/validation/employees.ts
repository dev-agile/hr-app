
import Joi from "joi";

const employeeRegister = Joi.object({
  _id: Joi.string().guid({ version: 'uuidv4' }).optional()
    .messages({
      'string.guid': '_id must be a valid UUID v4',
    }),
  first_name: Joi.string().required()
    .messages({
      'string.base': 'First name must be a string',
      'any.required': 'First name is required',
    }),
  last_name: Joi.string().optional()
    .messages({
      'string.base': 'Last name must be a string',
    }),
  dob: Joi.string().required()
    .messages({
      'string.base': 'Date of birth must be a string',
      'any.required': 'Date of birth is required',
    }),
  tech_stack: Joi.string().required()
    .messages({
      'string.base': 'Tech stack must be a string',
      'any.required': 'Tech stack is required',
    }),
  joining_date: Joi.string().required()
    .messages({
      'string.base': 'Joining date must be a string',
      'any.required': 'Joining date is required',
    }),
  ending_date: Joi.string().optional().allow(null)
    .messages({
      'string.base': 'Ending date must be a string',
    }),
  pan_image: Joi.string().optional().allow(null)
    .messages({
      'string.base': 'PAN image must be a string',
    }),
  aadhaar_image: Joi.string().optional().allow(null)
    .messages({
      'string.base': 'Aadhaar image must be a string',
    }),
  group: Joi.string().required()
    .messages({
      'string.base': 'Group must be a string',
      'any.required': 'Group is required',
    }),
  avatar: Joi.string().optional().allow(null)
    .messages({
      'string.base': 'Avatar must be a string',
    }),
  currently_working: Joi.boolean().required()
    .messages({
      'boolean.base': 'Currently working must be a boolean',
      'any.required': 'Currently working is required',
    }),
  father_name: Joi.string().required()
    .messages({
      'string.base': 'Father name must be a string',
      'any.required': 'Father name is required',
    }),
  mother_name: Joi.string().required()
    .messages({
      'string.base': 'Mother name must be a string',
      'any.required': 'Mother name is required',
    }),
  address: Joi.string().required()
    .messages({
      'string.base': 'Address must be a string',
      'any.required': 'Address is required',
    }),
  tenth_certificate: Joi.string().optional().allow(null)
    .messages({
      'string.base': 'Tenth Certificate must be a string',
    }),
  twelfth_certificate: Joi.string().optional().allow(null)
    .messages({
      'string.base': 'Twelfth Certificate must be a string',
    }),
  graduation_certificate: Joi.string().optional().allow(null)
    .messages({
      'string.base': 'Graduation Certificate must be a string',
    }),
  password:  Joi.string().required()
  .messages({
    'string.base': 'Password must be a string',
    'any.required': 'Password is required',
  }),
  email_address:  Joi.string().required()
  .messages({
    'string.base': 'Email Address must be a string',
    'any.required': 'Email Address is required',
  }),
});



export default employeeRegister