"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeRegister = void 0;
const joi_1 = __importDefault(require("joi"));
const employeeRegister = joi_1.default.object({
    id: joi_1.default.string().optional(),
    first_name: joi_1.default.string().required().messages({
        'any.required': 'First name is required',
        'string.empty': 'First name cannot be empty',
    }),
    last_name: joi_1.default.string().required().messages({
        'any.required': 'Last name is required',
        'string.empty': 'Last name cannot be empty',
    }),
    position: joi_1.default.string().required().messages({
        'any.required': 'Position is required',
        'string.empty': 'Position cannot be empty',
    }),
    department: joi_1.default.string().required().messages({
        'any.required': 'Department is required',
        'string.empty': 'Department cannot be empty',
    }),
    salary: joi_1.default.number().required().messages({
        'any.required': 'Salary is required',
        'number.base': 'Salary must be a number',
    }),
    aadhar_image: joi_1.default.string().required().messages({
        'any.required': 'Aadhar image is required',
        'string.empty': 'Aadhar image cannot be empty',
    }),
    pan_image: joi_1.default.string().required().messages({
        'any.required': 'Pan image is required',
        'string.empty': 'Pan image cannot be empty',
    }),
    qualification_images: joi_1.default.array()
        .items(joi_1.default.string())
        .required()
        .messages({
        'any.required': 'Qualification images are required',
        'array.base': 'Qualification images must be an array',
        'array.empty': 'Qualification images cannot be empty',
    }),
    email: joi_1.default.string().email().required().messages({
        'any.required': 'Email is required',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid email address',
    }),
    password: joi_1.default.string().required().messages({
        'any.required': 'Password is required',
        'string.empty': 'Password cannot be empty',
    }),
});
exports.employeeRegister = employeeRegister;
