// ~/instagram-api/app.js
import express from 'express';
import cors from 'cors';
import Product from './models/Product.js'
import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

await mongoose.connect(MONGO_URL);
console.log("데이터베이스에 연결되었습니다.");

app.listen(PORT, () => {
    console.log(`서버가 ${PORT}번 포트에서 기다리고 있어요.`);
});

app.get('/api/products', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const keyword = req.query.keyword || '';

        // name 또는 description에 검색어가 포함되어 있는지 확인하는 필터 (대소문자 무시)
        const filter = keyword ? {
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } }
            ]
        } : {};

        const products = await Product.find(filter)
            .select('id name price createdAt') // id, name, price, createdAt만 조회
            .sort({ createdAt: -1 })          // 최신순 정렬
            .skip(skip)                       // offset 계산
            .limit(limit);                    // 한 페이지에 가져올 개수

        const totalCount = await Product.countDocuments(filter);

        res.json({
            page,
            limit,
            totalCount,
            data: products
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 에러가 발생했습니다.' });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: '제품을 찾을 수 없습니다.' });
        }
        res.json(product);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 에러가 발생했습니다.' });
    }
})

app.post('/api/products', async (req, res) => {
    try {
        const { name, description, price, tags } = req.body;
        if (!name || price === undefined) {
            return res.status(400).json({ error: '상품 이름과 가격은 필수 입력 항목입니다.' });
        }
        const newProduct = new Product({ name, description, price, tags });
        await newProduct.save();
        res.status(201).json(newProduct);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 에러가 발생했습니다.' });
    }
})

app.patch('/api/products/:id', async (req, res) => {
    try {
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 에러가 발생했습니다.' });
    }
})

app.delete('/api/products/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: '제품을 찾을 수 없습니다.' });
        }
        res.json({ message: '제품이 삭제되었습니다.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 에러가 발생했습니다.' });
    }
})