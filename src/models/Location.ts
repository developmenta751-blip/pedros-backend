import mongoose, { Schema, Document } from "mongoose";

export interface ILocation extends Document {
  id: number;
  city: string;
  name: string;
  address: string;
  hours?: string;
  phone?: string;
  distance?: string;
  statusColor?: string;
}

const LocationSchema: Schema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    city: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    hours: { type: String },
    phone: { type: String },
    distance: { type: String },
    statusColor: { type: String }
  },
  { timestamps: true }
);

export default mongoose.models.Location || mongoose.model<ILocation>("Location", LocationSchema);
