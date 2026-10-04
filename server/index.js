import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRoutes from "./routes/products.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// 상품 API 연결
app.use("/products", productRoutes);

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI 환경변수가 필요합니다.");
}

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Panda Market API server is running",
  });
});

try {
  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  });
  console.log("MongoDB connected");

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.error("MongoDB connection error:", error);
  process.exitCode = 1;
}
