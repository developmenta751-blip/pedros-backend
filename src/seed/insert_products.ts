import "dotenv/config";
import { connectDB } from "../db";
import Product from "../models/Product";

const PRODUCTS = [
  { name: "Classic Beef Burger", description: "A classic grilled beef burger with fresh lettuce, tomato and our signature sauce.", price: 89.9, category: "Burgers", image: "", available: true },
  { name: "Chicken Burger", description: "Grilled chicken fillet with lettuce, tomato and creamy sauce.", price: 84.9, category: "Burgers", image: "", available: true },
  { name: "Chicken Wings", description: "Crispy chicken wings served with your choice of sauce.", price: 69.9, category: "Chicken", image: "", available: true },
  { name: "Chicken Strips", description: "Crispy golden chicken strips served with a dipping sauce.", price: 64.9, category: "Chicken", image: "", available: true },
  { name: "Large Chips", description: "Crispy golden chips.", price: 34.9, category: "Sides", image: "", available: true },
  { name: "Coleslaw", description: "Fresh and creamy homemade-style coleslaw.", price: 29.9, category: "Sides", image: "", available: true },
  { name: "Chocolate Milkshake", description: "Rich and creamy chocolate milkshake.", price: 44.9, category: "Drinks", image: "", available: true },
  { name: "Vanilla Milkshake", description: "Smooth and creamy vanilla milkshake.", price: 44.9, category: "Drinks", image: "", available: true }
];

async function run() {
  const uri = process.env.MONGO_URI as string;
  if (!uri) {
    console.error("MONGO_URI not set. Aborting.");
    process.exit(1);
  }
  await connectDB(uri);

  // Determine current max id in products collection
  const maxDoc: any = await Product.findOne().sort({ id: -1 }).lean();
  let nextId = maxDoc && typeof maxDoc.id === "number" ? maxDoc.id + 1 : 1;

  const inserted: any[] = [];
  for (const p of PRODUCTS) {
    const exists = await Product.findOne({ name: p.name }).lean();
    if (exists) {
      console.log(`Skipping existing product: ${p.name}`);
      continue;
    }
    const doc = {
      id: nextId,
      name: p.name,
      description: p.description,
      price: p.price,
      image: p.image ?? "",
      tag: null
    } as any;
    // Preserve the original simple Product model fields; additional fields (category, available) are stored in a metadata field if desired
    // We'll store category and available inside a `meta` field to avoid schema mismatch
    (doc as any).meta = { category: p.category, available: p.available };

    await Product.create(doc);
    inserted.push({ ...doc });
    console.log(`Inserted product id=${doc.id} name=${doc.name}`);
    nextId++;
  }

  console.log(`Done. Inserted ${inserted.length} new products.`);
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
