import mongoose, { Document, Schema } from 'mongoose';

interface IUserMenu extends Document {
  role_id: string;
  menuIds: string[];
}

const UserMenuSchema = new Schema<IUserMenu>({
  role_id: { type: String, required: true, unique: true },
  menuIds: [{ type: String }]
});

const UserMenu = mongoose.model<IUserMenu>('UserMenu', UserMenuSchema);
export default UserMenu;
