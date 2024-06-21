import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IEmployee extends Document {
    _id: string;
    first_name: string;
    last_name: string;
    position: string;
    department: string;
    salary: number;
    hired_date: Date;
    aadhar_image: string;
    pan_image: string;
    qualification_images: string[];
    email: string;
    password: string;
}

const employeeSchema = new mongoose.Schema({
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
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    hired_date: {
        type: Date,
        default: Date.now,
    },
    aadhar_image: {
        type: String,
        required: true,
    },
    pan_image: {
        type: String,
        required: true,
    },
    qualification_images: [{
        type: String,
    }],
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (email: string) {
                // Simple email validation regex
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message: 'Invalid email format'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
});

const Employee = mongoose.model<IEmployee>('Employee', employeeSchema);

export default Employee;
