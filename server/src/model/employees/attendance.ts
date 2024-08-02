import mongoose, { Document, Schema } from 'mongoose';

interface IAttendance extends Document {
  user_id: string;
  date: string;
  check_in: string;
  check_out: string;
  status: string;
  working_hours: string;
  pending_changes: {
    check_in?: string;
    check_out?: string;
    status?: string;
    working_hours?: string;
  };
  approval_status: 'approved' | 'pending' | 'rejected';
}

const AttendanceSchema = new Schema<IAttendance>({
  user_id: { type: String, ref: 'Employee', required: true },
  date: { type: String, required: true },
  check_in: { type: String },
  check_out: { type: String },
  status: { type: String },
  working_hours: { type: String },
  pending_changes: {
    check_in: { type: String },
    check_out: { type: String },
    status: { type: String },
    working_hours: { type: String },
  },
  approval_status: { type: String, enum: ['approved', 'pending', 'rejected'], default: 'approved' },
});

const Attendance = mongoose.model<IAttendance>('Attendance', AttendanceSchema);
export default Attendance;