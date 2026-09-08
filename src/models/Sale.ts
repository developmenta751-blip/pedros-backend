import mongoose, { Schema, Document } from "mongoose";

export interface ISale extends Document {
  saleNumber: string;
  items: any[];
  subtotal: number;
  discount?: number;
  tax?: number;
  total: number;
  payment: string;
  staff?: string; // staff username or id
  status: string;
}

const SaleSchema: Schema = new Schema(
  {
    saleNumber: { type: String, required: true, unique: true },
    items: { type: Array, required: true },
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, required: true },
    payment: { type: String, required: true },
    staff: { type: String },
    status: { type: String, default: "completed" }
  },
  { timestamps: true }
);

SaleSchema.index({ saleNumber: 1 });

export default mongoose.models.Sale || mongoose.model<ISale>("Sale", SaleSchema);
