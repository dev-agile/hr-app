import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IEmployee extends Document {
  employee_id?: string;
  first_name?: string;
  last_name?: string;
  date_of_birth?: Date;
  gender?: string;
  nationality?: string;
  marital_status?: string;
  photo?: string;
  designation?: string;
  joining_date?: Date;
  ending_date?: Date | null;
  father_name?: string;
  mother_name?: string;
  contact_information?: {
    email?: string;
    phone_number?: string;
    address?: {
      permanent?: {
        street?: string;
        city?: string;
        state?: string;
        zip_code?: string;
        country?: string;
      };
      current?: {
        street?: string;
        city?: string;
        state?: string;
        zip_code?: string;
        country?: string;
      };
    };
    emergency_contact?: {
      name?: string;
      relationship?: string;
      phone_number?: string;
    };
  };
  skills_and_qualifications?: {
    educational_background?: {
      degree?: string;
      institution?: string;
      graduation_date?: Date;
    }[];
    certifications?: {
      name?: string;
      institution?: string;
      date_obtained?: Date;
    }[];
    skills?: string[];
    languages_spoken?: string[];
    work_experience?: {
      employer?: string;
      job_title?: string;
      start_date?: Date;
      end_date?: Date;
    }[];
  };
  documents?: string[]; // Array of document paths
  isActive?: boolean; // New field
}

const employeeSchema: Schema<IEmployee> = new mongoose.Schema({
  employee_id: {
    type: String,
    default: uuidv4,
    required: false,
  },
  first_name: {
    type: String,
    required: false,
  },
  last_name: {
    type: String,
    required: false,
  },
  date_of_birth: {
    type: Date,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  nationality: {
    type: String,
    required: false,
  },
  marital_status: {
    type: String,
    required: false,
  },
  photo: {
    type: String,
    required: false,
  },
  designation: {
    type: String,
    required: false,
  },
  joining_date: {
    type: Date,
    required: false,
  },
  ending_date: {
    type: Date,
    required: false,
    default: null,
  },
  father_name: {
    type: String,
    required: false,
  },
  mother_name: {
    type: String,
    required: false,
  },
  contact_information: {
    email: {
      type: String,
      required: false,
    },
    phone_number: {
      type: String,
      required: false,
    },
    address: {
      permanent: {
        street: {
          type: String,
          required: false,
        },
        city: {
          type: String,
          required: false,
        },
        state: {
          type: String,
          required: false,
        },
        zip_code: {
          type: String,
          required: false,
        },
        country: {
          type: String,
          required: false,
        },
      },
      current: {
        street: {
          type: String,
          required: false,
        },
        city: {
          type: String,
          required: false,
        },
        state: {
          type: String,
          required: false,
        },
        zip_code: {
          type: String,
          required: false,
        },
        country: {
          type: String,
          required: false,
        },
      },
    },
    emergency_contact: {
      name: {
        type: String,
        required: false,
      },
      relationship: {
        type: String,
        required: false,
      },
      phone_number: {
        type: String,
        required: false,
      },
    },
  },
  skills_and_qualifications: {
    educational_background: [
      {
        degree: {
          type: String,
          required: false,
        },
        institution: {
          type: String,
          required: false,
        },
        graduation_date: {
          type: Date,
          required: false,
        },
      },
    ],
    certifications: [
      {
        name: {
          type: String,
          required: false,
        },
        institution: {
          type: String,
          required: false,
        },
        date_obtained: {
          type: Date,
          required: false,
        },
      },
    ],
    skills: [
      {
        type: String,
        required: false,
      },
    ],
    languages_spoken: [
      {
        type: String,
        required: false,
      },
    ],
    work_experience: [
      {
        employer: {
          type: String,
          required: false,
        },
        job_title: {
          type: String,
          required: false,
        },
        start_date: {
          type: Date,
          required: false,
        },
        end_date: {
          type: Date,
          required: false,
        },
      },
    ],
  },
  documents: [
    {
      type: String,
      required: false,
    },
  ], // Array of document paths
  isActive: {
    type: Boolean,
    default: true,
    required: true,
  },
});

const Employee = mongoose.model<IEmployee>('Employee', employeeSchema);

export default Employee;