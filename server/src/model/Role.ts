import mongoose, { Document, Schema } from 'mongoose';

export interface IFeaturePermission {
  feature: string;
  permissions: string[];
}

export interface IRole extends Document {
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
  name: {
    type: String,
    required: true,
    unique: true,
  },
  featurePermissions: [permissionSchema],
});

const Role = mongoose.model<IRole>('Role', roleSchema);
export default Role;
