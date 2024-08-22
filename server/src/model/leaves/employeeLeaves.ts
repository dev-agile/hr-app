import mongoose, { Document, Schema } from 'mongoose';

interface IEmployeeLeaves extends Document {
  user_id: string;
  holidaysPending: number;
}

const EmployeeLeavesSchema = new Schema<IEmployeeLeaves>({
  user_id: { type: String, required: true, unique: true },
  holidaysPending: { type: Number, required: true }
});

const EmployeeLeaves = mongoose.model<IEmployeeLeaves>('EmployeeLeaves', EmployeeLeavesSchema);
export default EmployeeLeaves;