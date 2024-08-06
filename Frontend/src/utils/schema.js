import * as yup from "yup";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

export const basicInfoSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  designation: yup.string().required("Designation is required"),
  father_name: yup.string().required("Father's name is required"),
  mother_name: yup.string().required("Mother's name is required"),
  joining_date: yup.date().required("Joining date is required").nullable(),
  ending_date: yup
    .date()
    .required("Ending date is required")
    .nullable()
    .min(yup.ref("joining_date"), "Ending date cannot be before joining date"),
  gender: yup.string().required("Gender is required"),
  marital_status: yup.string().required("Marital status is required"),
  dob: yup.date().required("Date of birth is required").nullable(),
  nationality: yup.string().required("Nationality is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain an uppercase letter")
    .matches(/[a-z]/, "Password must contain a lowercase letter")
    .matches(/[0-9]/, "Password must contain a number")
    .matches(/[!@#$%^&*]/, "Password must contain a special character"),
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
        zip_code: yup
          .string()
          .matches(/^\d{6}(-\d{5})?$/, "Invalid zip code")
          .required("Zip code is required"),
        country: yup.string().required("Country is required"),
      }),
      current: yup.object().shape({
        street: yup.string().required("Street is required"),
        city: yup.string().required("City is required"),
        state: yup.string().required("State is required"),
        zip_code: yup
          .string()
          .matches(/^\d{6}(-\d{5})?$/, "Invalid zip code")
          .required("Zip code is required"),
        country: yup.string().required("Country is required"),
      }),
    }),
    emergency_contact: yup.object().shape({
      name: yup.string().required("Name is required"),
      relationship: yup.string().required("Relationship is required"),
      phone_number: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Phone Number is required"),
    }),
  }),
});

export const addQualificationValidationSchema = yup.object({
  educationalBackground: yup.array().of(
    yup.object({
      degree: yup.string().required("Degree is required"),
      institution: yup.string().required("Institution is required"),
      graduation_date: yup
        .date()
        .required("Graduation date is required")
        .max(new Date(), "Graduation date cannot be in the future"),
    })
  ),
  certifications: yup.array().of(
    yup.object({
      name: yup.string().required("Certification name is required"),
      institution: yup
        .string()
        .required("Certification institution is required"),
      date_obtained: yup
        .date()
        .required("Date obtained is required")
        .max(new Date(), "Date obtained cannot be in the future"),
    })
  ),
  skills: yup
    .array()
    .of(yup.string().required("Skill is required").trim())
    .min(1, "At least one skill is required"),
  languages_spoken: yup
    .array()
    .of(yup.string().required("Language Spoken is required").trim())
    .min(1, "At least one language is required"),
  work_experience: yup.array().of(
    yup.object({
      employer: yup.string().required("Employer is required"),
      job_title: yup.string().required("Job title is required"),
      start_date: yup
        .date()
        .required("Start date is required")
        .max(new Date(), "Start date cannot be in the future"),
      end_date: yup
        .date()
        .nullable()
        .when("start_date", (start_date, schema) =>
          start_date
            ? schema.min(start_date, "End date cannot be before start date")
            : schema
        ),
    })
  ),
});

export const documentValidationSchema = yup.object({
  documents: yup.array().of(yup.string().required("File path is required")),
});
