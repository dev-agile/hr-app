"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Function to hash a password
const hashPassword = (password) => {
    return bcryptjs_1.default.hash(password, 10); // 10 rounds of salt
};
exports.hashPassword = hashPassword;
// Function to compare password with hashed password
const comparePassword = (password, hashedPassword) => {
    return bcryptjs_1.default.compare(password, hashedPassword);
};
exports.comparePassword = comparePassword;
