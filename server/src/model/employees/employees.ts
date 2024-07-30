import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IEmployee extends Document {
  _id: string;
  first_name: string;
  last_name?: string;
  dob: string;
  tech_stack: string;
  joining_date: string;
  ending_date?: string | null;
  pan_image?: string | null;
  aadhaar_image?: string | null;
  group: string;
  avatar?: string | null;
  currently_working: boolean;
  father_name: string;
  mother_name: string;
  address: string;
  tenth_certificate?: string | null;
  twelfth_certificate?: string | null;
  graduation_certificate?: string | null;
}

const employeeSchema: Schema<IEmployee> = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: false,
  },
  dob: {
    type: String,
    required: true,
  },
  tech_stack: {
    type: String,
    required: true,
  },
  joining_date: {
    type: String,
    required: true,
  },
  ending_date: {
    type: String,
    required: false,
    default: null,
  },
  pan_image: {
    type: String,
    required: false,
    default: null,
  },
  aadhaar_image: {
    type: String,
    required: false,
    default: null,
  },
  group: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
    default: null,
  },
  currently_working: {
    type: Boolean,
    required: true,
    default: true,
  },
  father_name: {
    type: String,
    required: true,
  },
  mother_name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  tenth_certificate: {
    type: String,
    required: false,
    default: null,
  },
  twelfth_certificate: {
    type: String,
    required: false,
    default: null,
  },
  graduation_certificate: {
    type: String,
    required: false,
    default: null,
  },
});

const Employee = mongoose.model<IEmployee>('Employee', employeeSchema);

export default Employee;
