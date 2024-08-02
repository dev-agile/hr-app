import mongoose, { Document, Schema } from 'mongoose';

export interface IHoliday extends Document {
  name: string;
  date: string;
  description: string;
  type: 'Public' | 'Company' | 'Optional';
  createdBy: number;
  updatedBy: number;
}

const holidaySchema: Schema<IHoliday> = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Public', 'Company', 'Optional'],
    default: 'Company',
    required: true,
  },
  createdBy: {
    type: Number,
    required: true,
  },
  updatedBy: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true, // This will add createdAt and updatedAt fields automatically
});

const Holiday = mongoose.model<IHoliday>('Holiday', holidaySchema);

export default Holiday;
