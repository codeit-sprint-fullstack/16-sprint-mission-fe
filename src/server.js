// ~/instagram-api/app.js
import express from 'express';
import cors from 'cors';
import Product from './models/Product.js'
import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGODB_URI;

const app = express();
app.use(cors());

await mongoose.connect(MONGO_URL);
console.log("데이터베이스에 연결되었습니다.");

app.listen(3000, () => {
    console.log('서버가 3000번 포트에서 기다리고 있어요.');
});

app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.get('/api/products/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: '제품을 찾을 수 없습니다.' });
    }
    res.json(product);
})

app.post('/api/products', async (req, res) => {
    const { name, description, price, tags } = req.body;
    const newProduct = new Product({ name, description, price, tags });
    await newProduct.save();
    res.status(201).json(newProduct);
})

app.patch('/api/products/:id', async (req, res) => {
    const { name, description, price, tags } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { name, description, price, tags },
        { new: true }
    );
    if (!updatedProduct) {
        return res.status(404).json({ message: '제품을 찾을 수 없습니다.' });
    }
    res.json(updatedProduct);
})

app.delete('/api/products/:id', async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
        return res.status(404).json({ message: '제품을 찾을 수 없습니다.' });
    }
    res.json({ message: '제품이 삭제되었습니다.' });
})