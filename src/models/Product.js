import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    price: Number,
    tags: [String],
    favoriteCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);

export default Product;