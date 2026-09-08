import "dotenv/config";
import { connectDB } from "../db";
import Product from "../models/Product";
import Offer from "../models/Offer";
import Location from "../models/Location";
import fs from "fs";
import path from "path";

async function seed() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI not set");
    process.exit(1);
  }
  await connectDB(process.env.MONGO_URI as string);

  const dataDir = path.join(__dirname, "data");
  const menu = JSON.parse(fs.readFileSync(path.join(dataDir, "menu.json"), "utf-8"));
  const offers = JSON.parse(fs.readFileSync(path.join(dataDir, "offers.json"), "utf-8"));
  const locations = JSON.parse(fs.readFileSync(path.join(dataDir, "locations.json"), "utf-8"));

  // Upsert products
  for (const item of menu) {
    await Product.updateOne({ id: item.id }, { $set: item }, { upsert: true });
  }

  for (const o of offers) {
    await Offer.updateOne({ id: o.id }, { $set: o }, { upsert: true });
  }

  for (const l of locations) {
    await Location.updateOne({ id: l.id }, { $set: l }, { upsert: true });
  }

  console.log("Seed complete");
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
