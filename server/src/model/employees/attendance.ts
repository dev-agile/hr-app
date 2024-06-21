// models/Attendance.js

import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const { Schema, model } = mongoose;

const attendanceSchema = new Schema({
  _id: {
    type: String,
    default: uuidv4,
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

export default Attendance;
