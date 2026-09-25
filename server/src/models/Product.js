import { randomUUID } from "node:crypto";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: randomUUID,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "상품명은 필수입니다."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "상품 소개는 필수입니다."],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "판매 가격은 필수입니다."],
      min: [0, "판매 가격은 0 이상이어야 합니다."],
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;