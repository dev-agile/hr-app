import mongoose, { Document } from 'mongoose';
import { envConfig } from '../config';

export interface IToken extends Document {
  userId: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

const tokenSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  refreshToken: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: envConfig.JWT_EXPIRATION_REFRESH }, 
  updatedAt: { type: Date, default: Date.now },
});

const Token = mongoose.model<IToken>('Token', tokenSchema);

export default Token;
