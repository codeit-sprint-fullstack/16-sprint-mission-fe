// ======================================================================
// 5. app.js에서 MongoDB + products 라우터 연결
// ======================================================================
//
// backend/app.js
//

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import productsRouter from "./routes/Product.js";

// .env가 backend 폴더 안에 있으므로
// 정확한 위치를 알려주는 것
dotenv.config();
const app = express();

// ======================================================================
// middleware
// ======================================================================

// React → Express 요청 허용
app.use(cors());

// JSON body 읽기
//
// 이게 있어야:
//
// req.body
//
// 를 사용할 수 있음.
app.use(express.json());

// ======================================================================
// 상품 API 연결
// ======================================================================
//
// productsRouter 안에서는:
//
// router.post("/")
//
// 라고 썼지만
//
// 앞에 /api/products가 붙기 때문에
//
// 실제 주소:
//
// POST /api/products
// GET  /api/products

app.use("/api/products", productsRouter);

// ======================================================================
// 서버 상태 확인
// ======================================================================

app.get("/", (req, res) => {
  res.json({
    message: "서버가 정상적으로 실행 중입니다.",
  });
});

// ======================================================================
// MongoDB 연결 → 서버 실행
// ======================================================================

const PORT = process.env.PORT || 3000;

// 비밀번호 자체는 출력하지 않고
// 환경변수가 들어왔는지만 확인
console.log("MONGODB_URI 있음?", !!process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB 연결 성공");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`서버 실행: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB 연결 실패:", error);
  });
