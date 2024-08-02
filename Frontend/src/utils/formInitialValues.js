export const basicInfoInitialValues = {
  firstName: "",
  lastName: "",
  designation: "",
  father_name: "",
  mother_name: "",
  joining_date: "",
  ending_date: "",
  gender: "",
  dob: "",
  nationality: "",
  marital_status: "",
  tech_stack: "",
  photo: "",
  contact_information: {
    email: "",
    phone_number: "",
    address: {
      permanent: {
        street: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
      },
      current: {
        street: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
      },
    },
    emergency_contact: {
      name: "",
      relationship: "",
      phone_number: "",
    },
  },
};

export const addQualificationsInitialValues = {
    educationalBackground: [
      {
        degree: "",
        institution: "",
        graduation_date: "",
      },
    ],
    certifications: [
      {
        name: "",
        institution: "",
        date_obtained: "",
      },
    ],
    skills: [""],
    languages_spoken: [""],
    work_experience: [
      {
        employer: "",
        job_title: "",
        start_date: "",
        end_date: "",
      },
    ],
  };