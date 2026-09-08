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
    order: async (_: any, { orderNumber }: { orderNumber: string }) => {
      const order = await Order.findOne({ orderNumber });
      return order ? order.toObject() : null;
    }
  },
  Mutation: {
    createOrder: async (_: any, { items, subtotal, deliveryFee, total, fulfillment, payment, customer }: any) => {
      let orderNumber = generateOrderNumber();
      // ensure uniqueness
      while (await Order.findOne({ orderNumber })) {
        orderNumber = generateOrderNumber();
      }
      const order = await Order.create({ orderNumber, items, subtotal, deliveryFee, total, fulfillment, payment, customer });
      return order.toObject();
    }
  }
};
