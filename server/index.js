import express from "express";
import cors from "cors";
import "dotenv/config";
import prisma from "./lib/prisma.js";
import productRoutes from "./routes/products.js";
import articleRoutes from "./routes/articles.js";
import {
  createParentCommentsRouter,
  commentRouter,
} from "./routes/comments.js";

const app = express();

const PORT = process.env.PORT || 3000;

const allowedOrigins = (
  process.env.CORS_ORIGIN || "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// 상품 API
app.use("/products", productRoutes);
app.use("/articles", articleRoutes);
app.use(
  "/products/:id/comments",
  createParentCommentsRouter("product")
);

app.use(
  "/articles/:id/comments",
  createParentCommentsRouter("article")
);

app.use("/comments", commentRouter);

// 서버 상태 확인
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Panda Market API server is running",
  });
});

// 서버 내부 오류
app.use((error, req, res, next) => {
  console.error("Server error:", error);

  if (error.status === 400 || error.type === "entity.parse.failed") {
    return res.status(400).json({
      message: "올바르지 않은 JSON 요청입니다.",
    });
  }

  return res.status(500).json({
    message: "서버 오류가 발생했습니다.",
  });
});

// PostgreSQL 연결 후 서버 시작
try {
  await prisma.$connect();

  console.log("PostgreSQL connected");

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.error("PostgreSQL connection error:", error);
  process.exitCode = 1;
  await prisma.$disconnect();
}