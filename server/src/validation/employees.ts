import Joi from "joi";

const employeeRegister = Joi.object({
  employee_id: Joi.string().guid({ version: 'uuidv4' }).optional()
    .messages({
      'string.guid': 'Employee ID must be a valid UUID v4',
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
  date_of_birth: Joi.date().required()
    .messages({
      'date.base': 'Date of birth must be a valid date',
      'any.required': 'Date of birth is required',
    }),
  gender: Joi.string().required()
    .messages({
      'string.base': 'Gender must be a string',
      'any.required': 'Gender is required',
    }),
  nationality: Joi.string().required()
    .messages({
      'string.base': 'Nationality must be a string',
      'any.required': 'Nationality is required',
    }),
  marital_status: Joi.string().required()
    .messages({
      'string.base': 'Marital status must be a string',
      'any.required': 'Marital status is required',
    }),
  photo: Joi.string().required()
    .messages({
      'string.base': 'Photo must be a string',
      'any.required': 'Photo is required',
    }),
  designation: Joi.string().required()
    .messages({
      'string.base': 'Designation must be a string',
      'any.required': 'Designation is required',
    }),
  joining_date: Joi.date().required()
    .messages({
      'date.base': 'Joining date must be a valid date',
      'any.required': 'Joining date is required',
    }),
  ending_date: Joi.date().optional().allow(null)
    .messages({
      'date.base': 'Ending date must be a valid date',
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
  contact_information: Joi.object({
    email: Joi.string().email().required()
      .messages({
        'string.base': 'Email must be a string',
        'string.email': 'Email must be a valid email',
        'any.required': 'Email is required',
      }),
    phone_number: Joi.string().required()
      .messages({
        'string.base': 'Phone number must be a string',
        'any.required': 'Phone number is required',
      }),
    address: Joi.object({
      permanent: Joi.object({
        street: Joi.string().required()
          .messages({
            'string.base': 'Permanent street must be a string',
            'any.required': 'Permanent street is required',
          }),
        city: Joi.string().required()
          .messages({
            'string.base': 'Permanent city must be a string',
            'any.required': 'Permanent city is required',
          }),
        state: Joi.string().required()
          .messages({
            'string.base': 'Permanent state must be a string',
            'any.required': 'Permanent state is required',
          }),
        zip_code: Joi.string().required()
          .messages({
            'string.base': 'Permanent zip code must be a string',
            'any.required': 'Permanent zip code is required',
          }),
        country: Joi.string().required()
          .messages({
            'string.base': 'Permanent country must be a string',
            'any.required': 'Permanent country is required',
          }),
      }).required(),
      current: Joi.object({
        street: Joi.string().required()
          .messages({
            'string.base': 'Current street must be a string',
            'any.required': 'Current street is required',
          }),
        city: Joi.string().required()
          .messages({
            'string.base': 'Current city must be a string',
            'any.required': 'Current city is required',
          }),
        state: Joi.string().required()
          .messages({
            'string.base': 'Current state must be a string',
            'any.required': 'Current state is required',
          }),
        zip_code: Joi.string().required()
          .messages({
            'string.base': 'Current zip code must be a string',
            'any.required': 'Current zip code is required',
          }),
        country: Joi.string().required()
          .messages({
            'string.base': 'Current country must be a string',
            'any.required': 'Current country is required',
          }),
      }).required(),
    }).required(),
    emergency_contact: Joi.object({
      name: Joi.string().required()
        .messages({
          'string.base': 'Emergency contact name must be a string',
          'any.required': 'Emergency contact name is required',
        }),
      relationship: Joi.string().required()
        .messages({
          'string.base': 'Emergency contact relationship must be a string',
          'any.required': 'Emergency contact relationship is required',
        }),
      phone_number: Joi.string().required()
        .messages({
          'string.base': 'Emergency contact phone number must be a string',
          'any.required': 'Emergency contact phone number is required',
        }),
    }).required(),
  }).required(),
  skills_and_qualifications: Joi.object({
    educational_background: Joi.array().items(
      Joi.object({
        degree: Joi.string().required()
          .messages({
            'string.base': 'Degree must be a string',
            'any.required': 'Degree is required',
          }),
        institution: Joi.string().required()
          .messages({
            'string.base': 'Institution must be a string',
            'any.required': 'Institution is required',
          }),
        graduation_date: Joi.date().required()
          .messages({
            'date.base': 'Graduation date must be a valid date',
            'any.required': 'Graduation date is required',
          }),
      })
    ).required(),
    certifications: Joi.array().items(
      Joi.object({
        name: Joi.string().required()
          .messages({
            'string.base': 'Certification name must be a string',
            'any.required': 'Certification name is required',
          }),
        institution: Joi.string().required()
          .messages({
            'string.base': 'Certification institution must be a string',
            'any.required': 'Certification institution is required',
          }),
        date_obtained: Joi.date().required()
          .messages({
            'date.base': 'Certification date obtained must be a valid date',
            'any.required': 'Certification date obtained is required',
          }),
      })
    ).required(),
    skills: Joi.array().items(
      Joi.string().required()
        .messages({
          'string.base': 'Skill must be a string',
          'any.required': 'Skill is required',
        })
    ).required(),
    languages_spoken: Joi.array().items(
      Joi.string().required()
        .messages({
          'string.base': 'Language must be a string',
          'any.required': 'Language is required',
        })
    ).required(),
    work_experience: Joi.array().items(
      Joi.object({
        employer: Joi.string().required()
          .messages({
            'string.base': 'Employer must be a string',
            'any.required': 'Employer is required',
          }),
        job_title: Joi.string().required()
          .messages({
            'string.base': 'Job title must be a string',
            'any.required': 'Job title is required',
          }),
        start_date: Joi.date().required()
          .messages({
            'date.base': 'Start date must be a valid date',
            'any.required': 'Start date is required',
          }),
        end_date: Joi.date().required()
          .messages({
            'date.base': 'End date must be a valid date',
            'any.required': 'End date is required',
          }),
      })
    ).required(),
  }).required(),
  password: Joi.string().required()
    .messages({
      'string.base': 'Password must be a string',
      'any.required': 'Password is required',
    }),
});

export default employeeRegister;
