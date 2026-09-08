import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string;
  tag?: string | null;
}

const ProductSchema: Schema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    tag: { type: String, default: null }
      ,
      category: { type: String, default: null },
      available: { type: Boolean, default: true },
      stock: { type: Number, default: null }
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
