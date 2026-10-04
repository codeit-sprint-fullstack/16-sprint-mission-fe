// ~/instagram-api/app.js
import express from 'express';
import cors from 'cors';
import {items} from './db.js';
import mongoose from 'mongoose';

const MONGO_URL = 'mongodb+srv://jaka0926_db_user:<db_password>@cluster0.lbmbshp.mongodb.net/?appName=Cluster0'

const app = express();
app.use(cors());

await mongoose.connect(MONGO_URL);
console.log("데이터베이스에 연결되었습니다.");

app.get('/', (req, res) => {
    res.send('인스타그램 서버가 살아 있어요');
});

app.get('/items', (req, res) => {
    res.json(items);
});

app.listen(3000, () => {
    console.log('서버가 3000번 포트에서 기다리고 있어요.');
});