import { Document, Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { AttendanceStatus } from '@enums';





interface IAttendance extends Document {
  user_id: string;
  date: string;
  check_in?: string;
  check_out?: string;
  status: AttendanceStatus;
  working_hours:string
}


const AttendanceSchema = new Schema<IAttendance>({
  _id: { type: String, default: uuidv4 }, 
  user_id: { type: String, ref: 'Employee', required: true },
  date: { type: String, default: () => moment().format('DD-MM-YYYY') },
  check_in: { type: String },
  check_out: { type: String },
  status: {
    type: String,
    enum: Object.values(AttendanceStatus),
   
  },
  working_hours:{type:String,}
});


const Attendance = model<IAttendance>('Attendance', AttendanceSchema);
export default Attendance;
