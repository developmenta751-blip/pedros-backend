import Product from "../models/Product";
import Offer from "../models/Offer";
import Location from "../models/Location";
import Order from "../models/Order";
import { generateOrderNumber } from "../utils/orderUtils";

export const resolvers = {
  Query: {
    menuItems: async () => await Product.find().sort({ id: 1 }).lean(),
    menuItem: async (_: any, { id }: { id: number }) => await Product.findOne({ id }).lean(),
    offers: async () => await Offer.find().sort({ id: 1 }).lean(),
    locations: async () => await Location.find().sort({ id: 1 }).lean(),
    order: async (_: any, { orderNumber }: { orderNumber: string }) => await Order.findOne({ orderNumber }).lean()
  },
  Mutation: {
    createOrder: async (_: any, { items, subtotal, deliveryFee, total, fulfillment, payment, customer }: any) => {
      const orderNumber = generateOrderNumber();
      const exists = await Order.findOne({ orderNumber });
      if (exists) return await Order.create({ orderNumber: generateOrderNumber(), items, subtotal, deliveryFee, total, fulfillment, payment, customer });
      const order = await Order.create({ orderNumber, items, subtotal, deliveryFee, total, fulfillment, payment, customer });
      return order.toObject();
    }
  }
};
