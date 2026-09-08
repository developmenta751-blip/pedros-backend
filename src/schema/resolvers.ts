import Product from "../models/Product";
import Offer from "../models/Offer";
import Location from "../models/Location";
import Order from "../models/Order";
import Category from "../models/Category";
import Staff from "../models/Staff";
import Sale from "../models/Sale";
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
    ,
    // Admin queries
    products: async () => await Product.find().sort({ id: 1 }).lean(),
    product: async (_: any, { id }: { id: number }) => await Product.findOne({ id }).lean(),
    categories: async () => await Category.find().sort({ order: 1 }).lean(),
    staff: async () => await Staff.find().sort({ username: 1 }).lean(),
    sales: async (_: any, { from, to }: any) => {
      const q: any = {};
      if (from || to) q.createdAt = {};
      if (from) q.createdAt.$gte = new Date(from);
      if (to) q.createdAt.$lte = new Date(to);
      return await Sale.find(q).sort({ createdAt: -1 }).lean();
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

    // Product CRUD
    ,createProduct: async (_: any, { input }: any) => {
      const max: any = await Product.findOne().sort({ id: -1 }).lean();
      const nextId = max && typeof max.id === 'number' ? max.id + 1 : 1;
      const doc = { id: nextId, ...input } as any;
      const p = await Product.create(doc);
      return p.toObject();
    }
    ,updateProduct: async (_: any, { id, input }: any) => {
      const p = await Product.findOneAndUpdate({ id }, { $set: input }, { new: true }).lean();
      return p;
    }
    ,deleteProduct: async (_: any, { id }: any) => {
      await Product.deleteOne({ id });
      return true;
    }

    // Category CRUD
    ,createCategory: async (_: any, { input }: any) => {
      const max: any = await Category.findOne().sort({ id: -1 }).lean();
      const nextId = max && typeof max.id === 'number' ? max.id + 1 : 1;
      const c = await Category.create({ id: nextId, ...input });
      return c.toObject();
    }
    ,updateCategory: async (_: any, { id, input }: any) => {
      const c = await Category.findOneAndUpdate({ id }, { $set: input }, { new: true }).lean();
      return c;
    }
    ,deleteCategory: async (_: any, { id }: any) => {
      await Category.deleteOne({ id });
      return true;
    }

    // Staff CRUD
    ,createStaff: async (_: any, { username, name, role }: any) => {
      const exists = await Staff.findOne({ username });
      if (exists) return exists.toObject();
      const s = await Staff.create({ username, name, role });
      return s.toObject();
    }
    ,updateStaff: async (_: any, { username, name, role, active }: any) => {
      const update: any = {};
      if (name !== undefined) update.name = name;
      if (role !== undefined) update.role = role;
      if (active !== undefined) update.active = active;
      const s = await Staff.findOneAndUpdate({ username }, { $set: update }, { new: true }).lean();
      return s;
    }

    // Sales / POS
    ,createSale: async (_: any, { items, discount = 0, tax = 0, payment, staff }: any) => {
      // server-side validation: compute subtotal from product prices
      let subtotal = 0;
      const enriched: any[] = [];
      for (const it of items) {
        const prod: any = await Product.findOne({ id: it.id }).lean();
        if (!prod) throw new Error(`Product id=${it.id} not found`);
        const price = prod.price as number;
        const qty = it.qty || 1;
        subtotal += price * qty;
        enriched.push({ id: prod.id, name: prod.name, price, qty, image: prod.image });
      }
      const total = +(subtotal - (discount || 0) + (tax || 0)).toFixed(2);
      let saleNumber = generateOrderNumber();
      while (await Sale.findOne({ saleNumber })) saleNumber = generateOrderNumber();
      const sale = await Sale.create({ saleNumber, items: enriched, subtotal, discount, tax, total, payment, staff, status: 'completed' });
      return sale.toObject();
    }
  }
};
