import mongoose, { Document, Schema } from 'mongoose';

interface IMenu extends Document {
  menu_id: string;
  name: string;
  icon: string;
  tooltip: string;
  description: string;
  url: string;
  sortOrder: number;
  childrens: IMenu[];
}

const MenuSchema = new Schema<IMenu>({
  menu_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  icon: { type: String, required: true },
  tooltip: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  sortOrder: { type: Number, required: true },
  childrens: [new Schema({
    menu_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    icon: { type: String, required: true },
    tooltip: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    sortOrder: { type: Number, required: true },
  })]
});

const Menu = mongoose.model<IMenu>('Menu', MenuSchema);
export default Menu;
