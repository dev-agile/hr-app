import * as yup from "yup";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

export const basicInfoSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  designation: yup.string().required("Designation is required"),
  father_name: yup.string().required("Father's name is required"),
  mother_name: yup.string().required("Mother's name is required"),
  joining_date: yup.string().required("Joining date is required"),
  ending_date: yup.string().required("Ending date is required"),
  gender: yup.string().required("Gender is required"),
  marital_status: yup.string().required("Marital status is required"),
  dob: yup.string().required("Date of birth is required"),
  nationality: yup.string().required("Nationality is required"),
  tech_stack: yup.string().required("Tech stack is required"),
  contact_information: yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    phone_number: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is required"),
    address: yup.object().shape({
      permanent: yup.object().shape({
        street: yup.string().required("Street is required"),
        city: yup.string().required("City is required"),
        state: yup.string().required("State is required"),
        zip_code: yup.string().required("Zip code is required"),
        country: yup.string().required("Country is required"),
      }),
      current: yup.object().shape({
        street: yup.string().required("Street is required"),
        city: yup.string().required("City is required"),
        state: yup.string().required("State is required"),
        zip_code: yup.string().required("Zip code is required"),
        country: yup.string().required("Country is required"),
      }),
    }),
    emergency_contact: yup.object().shape({
      name: yup.string().required("Name is required"),
      relationship: yup.string().required("Relationship is required"),
      phone_number: yup.string().required("Phone Number is required"),
    }),
  }),
});

export const addQualificationValidationSchema = yup.object({
  educationalBackground: yup.array().of(
    yup.object({
      degree: yup.string().required("Degree is required"),
      institution: yup.string().required("Institution is required"),
      graduation_date: yup.date().required("Graduation date is required"),
    })
  ),
  certifications: yup.array().of(
    yup.object({
      name: yup.string().required("Certification name is required"),
      institution: yup
        .string()
        .required("Certification institution is required"),
      date_obtained: yup.date().required("Date obtained is required"),
    })
  ),
  skills: yup.array().of(yup.string().required("Skill is required")),
  languages_spoken: yup
    .array()
    .of(yup.string().required("Languages Spoken is required")),
  work_experience: yup.array().of(
    yup.object({
      employer: yup.string().required("Employer is required"),
      job_title: yup.string().required("Job title is required"),
      start_date: yup.date().required("Start date is required"),
      end_date: yup.date().nullable(),
    })
  ),
});
