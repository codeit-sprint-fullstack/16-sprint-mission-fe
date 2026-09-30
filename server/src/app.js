import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import productsRouter from "./routes/products.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/products", productsRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Panda Market API is running",
  });
});

app.use((req, res) => {
  return res.status(404).json({
    message: "요청한 경로를 찾을 수 없습니다.",
  });
});

app.use((error, req, res, _next) => {
  if (error instanceof SyntaxError && "body" in error) {
    return res.status(400).json({
      message: "올바른 JSON 형식으로 요청해주세요.",
    });
  }

  console.error(error);

  return res.status(500).json({
    message: "서버 오류가 발생했습니다.",
  });
});

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI가 설정되지 않았습니다.");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

startServer();