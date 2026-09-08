import mongoose, { Schema, Document } from "mongoose";

export interface IStaff extends Document {
  username: string;
  name: string;
  role: "admin" | "manager" | "cashier" | string;
  active: boolean;
}

const StaffSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, required: true, default: "cashier" },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.models.Staff || mongoose.model<IStaff>("Staff", StaffSchema);
