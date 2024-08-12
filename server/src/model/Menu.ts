import mongoose, { Document, Schema } from 'mongoose';

interface IMenu extends Document {
  menu_id: string;
  name: string;
  icon: string;
  tooltip: string;
  description: string;
  url: string;
  sortOrder: number;
  ParentId?: string;
  subMenu: boolean;
  isMenu: boolean;
  children: IMenu[]; // Define children as an array of IMenu
}

const MenuSchema = new Schema<IMenu>({
  menu_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  icon: { type: String, required: true },
  tooltip: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  sortOrder: { type: Number, required: true },
  ParentId: { type: String, required: true },
  subMenu: { type: Boolean, required: true },
  isMenu: { type: Boolean, required: true },
  children: { type: [Schema.Types.Mixed], default: [] } // Add children property to the schema
});

const Menu = mongoose.model<IMenu>('Menu', MenuSchema);
export default Menu;
