import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  user_id: string;
  email_address: string;
  role: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  user_id: { type: String, required: true, unique: true },
  email_address: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  password: { type: String, required: true }
});


const UsersRole = mongoose.model<IUser>('UserRole', UserSchema);

export default UsersRole;
