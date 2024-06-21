import mongoose, { Schema, Document } from 'mongoose';


export interface IUser extends Document {
  email: string;
  role: string;
}


const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true }
});


const UserRole = mongoose.model<IUser>('User', UserSchema);

export default UserRole;
