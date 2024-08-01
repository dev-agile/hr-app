import mongoose, { Document, Schema } from 'mongoose';

interface IDayType extends Document {
  Status: string;
  Description: string;
  WorkingHours: number;
}

const DayTypeSchema: Schema = new Schema({
  Status: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  WorkingHours: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const DayType = mongoose.model<IDayType>('DayType', DayTypeSchema);

export { DayType, IDayType };
