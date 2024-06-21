"use strict";
// models/Attendance.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
const { Schema, model } = mongoose_1.default;
const attendanceSchema = new Schema({
    _id: {
        type: String,
        default: uuid_1.v4,
    },
    userId: {
        type: String,
        required: true,
    },
    entryTime: {
        type: Date,
    },
    exitTime: {
        type: Date,
    },
    attendanceDate: {
        type: Date,
        default: Date.now,
    },
});
const Attendance = model('Attendance', attendanceSchema);
exports.default = Attendance;
