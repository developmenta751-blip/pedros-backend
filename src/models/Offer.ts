import mongoose, { Schema, Document } from "mongoose";

export interface IOffer extends Document {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  original?: number;
  price: number;
  badge?: string;
  image?: string;
  color?: string;
  expires?: string;
}

const OfferSchema: Schema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String },
    original: { type: Number },
    price: { type: Number, required: true },
    badge: { type: String },
    image: { type: String },
    color: { type: String },
    expires: { type: String }
  },
  { timestamps: true }
);

export default mongoose.models.Offer || mongoose.model<IOffer>("Offer", OfferSchema);
