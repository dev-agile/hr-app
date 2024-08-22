import mongoose, { Document, Schema } from 'mongoose';

interface ILeaves extends Document {
  leave_id: string; 
  user_id: string;
  holidayType: 'Half Day' | 'Full Day';
  status: 'Pending' | 'Rejected' | 'Accepted';
  description: string | null;
  isActive: boolean;
  duration: number;
  document: string;
  leaveDate: Date;  
}

const LeavesSchema = new Schema<ILeaves>({
  leave_id: { type: String, required: true, unique: true }, 
  user_id: { type: String, required: true },
  holidayType: { 
    type: String, 
    required: true, 
    enum: ['Half Day', 'Full Day'] 
  },
  status: { 
    type: String, 
    required: true, 
    enum: ['Pending', 'Rejected', 'Accepted'],
    default: 'Pending'
  },
  description: { type: String, default: null },
  isActive: { type: Boolean, required: true, default: true },
  duration: { type: Number, required: true },
  document: { type: String, required: true },
  leaveDate: { type: Date, required: true }  
});

const Leaves = mongoose.model<ILeaves>('Leaves', LeavesSchema);
export default Leaves;