import mongoose, { Schema, Document } from "mongoose";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
  image?: string;
};

export interface IOrder extends Document {
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  fulfillment: string;
  payment: string;
  customer: {
    name: string;
    surname?: string;
    phone: string;
    email?: string;
    address?: string;
    suburb?: string;
    city?: string;
    special?: string;
  };
  status: string;
}

const CartItemSchema = new Schema(
  {
    id: Number,
    name: String,
    price: Number,
    qty: Number,
    image: String
  },
  { _id: false }
);

const OrderSchema: Schema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    items: { type: [CartItemSchema], required: true },
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    total: { type: Number, required: true },
    fulfillment: { type: String, required: true },
    payment: { type: String, required: true },
    customer: {
      name: { type: String, required: true },
      surname: { type: String },
      phone: { type: String, required: true },
      email: { type: String },
      address: { type: String },
      suburb: { type: String },
      city: { type: String },
      special: { type: String }
    },
    status: { type: String, default: "pending" }
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

OrderSchema.virtual("id").get(function () {
  // ensure a string id property is available for GraphQL
  return this._id ? this._id.toString() : undefined;
});

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
