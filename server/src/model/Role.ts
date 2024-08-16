import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IFeaturePermission {
  feature: string;
  permissions: string[];
}

export interface IRole extends Document {
  role_id: string;
  name: string;
  featurePermissions: IFeaturePermission[];
}

const permissionSchema = new Schema({
  feature: {
    type: String,
    required: true,
  },
  permissions: {
    type: [String],
    enum: ['read', 'write', 'delete', 'update'],
    required: true,
  },
});

const roleSchema = new Schema({
  role_id: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  featurePermissions: [permissionSchema],
});

const Role = mongoose.model<IRole>('Role', roleSchema);
export default Role;