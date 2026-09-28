import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRouter from "./routes/products.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/products", productRouter);

app.get("/", (req, res) => {
  res.send("Panda Market API");
});

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}

connectDatabase();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});