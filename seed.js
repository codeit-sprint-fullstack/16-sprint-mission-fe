
import mongoose from 'mongoose';
import Product from './src/models/Product.js';
import { items } from './src/db.js';

const MONGO_URL = process.env.MONGODB_URI;
await mongoose.connect(MONGO_URL);

await Product.deleteMany({});
await Product.insertMany(items);

console.log(`상품${items.length}개를 넣었어요.`);

await mongoose.disconnect();