import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import Product from "./models/Product.js";



const app = express();


const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());

await mongoose.connect(process.env.MONGO_URL);


app.get("/", (req, res) => {
  res.send("Panda Market API");
});

//전체 목록 불러오기
app.get('/products', async (req, res) => {
  try {
    const offset = Number(req.query.offset ?? 0);
    const limit = Number(req.query.limit ?? 10);
    const keyword = req.query.keyword ?? '';

    if (
      Number.isNaN(offset) ||
      Number.isNaN(limit) ||
      !Number.isInteger(offset) ||
      !Number.isInteger(limit) ||
      offset < 0 ||
      limit <= 0
    ) {
      res.status(400).json({
        message: 'offset과 limit 값을 확인해주세요.',
      });
      return;
    }

    let filter = {};

    if (keyword) {
      filter = {
        $or: [
          {
            name: {
              $regex: keyword,
              $options: 'i',
            },
          },
          {
            description: {
              $regex: keyword,
              $options: 'i',
            },
          },
        ],
      };
    }

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);

    const totalCount = await Product.countDocuments(filter);

    const list = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      createdAt: product.createdAt,
    }));

    res.status(200).json({
      list,
      totalCount,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: '상품 목록 조회 중 오류가 발생했습니다.',
    });
  }
});


//상품 상세 조회 
app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({
        message: '상품을 찾을 수 없습니다.',
      });
      return;
    }

    const result = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
      createdAt: product.createdAt,
    };

    res.json(result);
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).json({
        message: '올바르지 않은 상품 ID입니다.',
      });
      return;
    }

    console.error(error);

    res.status(500).json({
      message: '상품 조회 중 오류가 발생했습니다.',
    });
  }
});

//상품등록
app.post('/products', async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      tags,
    } = req.body;

    if (
      !name ||
      !description ||
      price === undefined ||
      !tags
    ) {
      res.status(400).json({
        message: '필수 입력값을 확인해주세요.',
      });
      return;
    }

    const product = await Product.create({
      name,
      description,
      price,
      tags,
    });

    const result = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
      createdAt: product.createdAt,
    };

    res.status(201).json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: '상품 등록 중 오류가 발생했습니다.',
    });
  }
});


//상품정보 수정
app.patch('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      res.status(404).json({
        message: '상품을 찾을 수 없습니다.',
      });
      return;
    }

    res.json(product);
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).json({
        message: '올바르지 않은 상품 ID입니다.',
      });
      return;
    }

    if (error.name === 'ValidationError') {
      res.status(400).json({
        message: '상품 정보를 확인해주세요.',
      });
      return;
    }

    console.error(error);

    res.status(500).json({
      message: '상품 수정 중 오류가 발생했습니다.',
    });
  }
});

//상품 삭제
app.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      res.status(404).json({
        message: '상품을 찾을 수 없습니다.',
      });
      return;
    }

    res.status(200).json({
      message: '상품이 삭제되었습니다.',
    });
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).json({
        message: '올바르지 않은 상품 ID입니다.',
      });
      return;
    }

    console.error(error);

    res.status(500).json({
      message: '상품 삭제 중 오류가 발생했습니다.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`서버가${PORT}번 포트에서 기다리고 있어요.`);
});