import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IEmployee extends Document {
  employee_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  gender: string;
  nationality: string;
  marital_status: string;
  photo: string;
  designation: string;
  joining_date: Date;
  ending_date: Date;
  father_name: string;
  mother_name: string;
  contact_information: {
    email: string;
    phone_number: string;
    address: {
      permanent: {
        street: string;
        city: string;
        state: string;
        zip_code: string;
        country: string;
      };
      current: {
        street: string;
        city: string;
        state: string;
        zip_code: string;
        country: string;
      };
    };
    emergency_contact: {
      name: string;
      relationship: string;
      phone_number: string;
    };
  };
  skills_and_qualifications: {
    educational_background: {
      degree: string;
      institution: string;
      graduation_date: Date;
    }[];
    certifications: {
      name: string;
      institution: string;
      date_obtained: Date;
    }[];
    skills: string[];
    languages_spoken: string[];
    work_experience: {
      employer: string;
      job_title: string;
      start_date: Date;
      end_date: Date;
    }[];
  };
  documents: string[]; // Array of document paths
}

const employeeSchema: Schema<IEmployee> = new mongoose.Schema({
  employee_id: {
    type: String,
    default: uuidv4,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  marital_status: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  joining_date: {
    type: Date,
    required: true,
  },
  ending_date: {
    type: Date,
    required: false,
    default: null,
  },
  father_name: {
    type: String,
    required: true,
  },
  mother_name: {
    type: String,
    required: true,
  },
  contact_information: {
    email: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    address: {
      permanent: {
        street: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        zip_code: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
      },
      current: {
        street: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        zip_code: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
      },
    },
    emergency_contact: {
      name: {
        type: String,
        required: true,
      },
      relationship: {
        type: String,
        required: true,
      },
      phone_number: {
        type: String,
        required: true,
      },
    },
  },
  skills_and_qualifications: {
    educational_background: [
      {
        degree: {
          type: String,
          required: true,
        },
        institution: {
          type: String,
          required: true,
        },
        graduation_date: {
          type: Date,
          required: true,
        },
      },
    ],
    certifications: [
      {
        name: {
          type: String,
          required: true,
        },
        institution: {
          type: String,
          required: true,
        },
        date_obtained: {
          type: Date,
          required: true,
        },
      },
    ],
    skills: [
      {
        type: String,
        required: true,
      },
    ],
    languages_spoken: [
      {
        type: String,
        required: true,
      },
    ],
    work_experience: [
      {
        employer: {
          type: String,
          required: true,
        },
        job_title: {
          type: String,
          required: true,
        },
        start_date: {
          type: Date,
          required: true,
        },
        end_date: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  documents: [
    {
      type: String,
      required: true,
    },
  ], // Array of document paths
});

const Employee = mongoose.model<IEmployee>('Employee', employeeSchema);

export default Employee;
