"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../../model");
const utils_1 = require("../../../utils");
const constants_1 = require("../../../constants");
const constants_2 = require("../../../constants");
const bcrypt_1 = require("../../../utils/bcrypt");
const employees_1 = require("../../../validation/employees");
// POST /employees/create
const usert = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, first_name, last_name, position, department, salary, aadhar_image, pan_image, qualification_images, email, password } = req.body;
    let employee;
    const hashedPassword = yield (0, bcrypt_1.hashPassword)(password);
    const { error, value } = employees_1.employeeRegister.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map((err) => ({
            field: err.path[0],
            message: err.message,
        }));
        return (0, utils_1.resCustom)(res, constants_1.STATUS.NOT_ACCEPTABLE, errorMessages, null);
    }
    if (id) {
        // Update existing employee
        employee = yield model_1.employeeModel.Employee.default.findOneAndUpdate({ _id: id }, {
            first_name,
            last_name,
            position,
            department,
            salary,
            aadhar_image,
            pan_image,
            qualification_images,
            email,
            password: hashedPassword
        }, {
            new: true,
            runValidators: true
        });
        if (!employee) {
            (0, utils_1.resCustom)(res, constants_1.STATUS.NOT_FOUND, constants_1.MESSAGES.NOT_FOUND, null);
        }
    }
    else {
        employee = yield model_1.employeeModel.Employee.default.create({
            first_name,
            last_name,
            position,
            department,
            salary,
            aadhar_image,
            pan_image,
            qualification_images,
            email,
            password: hashedPassword
        });
        yield model_1.UserRole.create({ email, role: constants_2.ROLES.EMPLOYEE });
    }
    (0, utils_1.resCustom)(res, constants_1.STATUS.OK, constants_1.MESSAGES.SUCCESS, employee);
});
exports.default = usert;
