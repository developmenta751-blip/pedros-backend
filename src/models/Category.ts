import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  id: number;
  name: string;
  active: boolean;
  order?: number;
}

const CategorySchema: Schema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);
