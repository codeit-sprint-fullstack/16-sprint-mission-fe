import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// 상품 등록
router.post("/", async (req, res) => {
  try {
    const { name, description, price, tags } = req.body;

    if (!name || !description || price === undefined) {
      return res.status(400).json({
        message: "필수 입력값이 없습니다.",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      tags,
    });

    return res.status(201).json(product);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "상품 등록에 실패했습니다.",
    });
  }
});

// 상품 목록 조회
router.get("/", async (req, res) => {
  try {
    const {
      offset = 0,
      limit = 10,
      orderBy = "recent",
      keyword = "",
    } = req.query;

    const filter = keyword
      ? {
          $or: [
            {
              name: {
                $regex: keyword,
                $options: "i",
              },
            },
            {
              description: {
                $regex: keyword,
                $options: "i",
              },
            },
          ],
        }
      : {};

    const sort =
      orderBy === "recent"
        ? { createdAt: -1 }
        : {};

    const products = await Product.find(filter)
      .select("name price createdAt")
      .sort(sort)
      .skip(Number(offset))
      .limit(Number(limit));

    const totalCount =
      await Product.countDocuments(filter);

    return res.status(200).json({
      totalCount,
      products,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "상품 목록 조회에 실패했습니다.",
    });
  }
});

// 상품 상세 조회
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    ).select(
      "name description price tags createdAt"
    );

    if (!product) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      message: "잘못된 상품 ID입니다.",
    });
  }
});

// 상품 수정
router.patch("/:id", async (req, res) => {
  try {
    const { name, description, price, tags } =
      req.body;

    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        {
          name,
          description,
          price,
          tags,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!product) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      message: "상품 수정에 실패했습니다.",
    });
  }
});

// 상품 삭제
router.delete("/:id", async (req, res) => {
  try {
    const product =
      await Product.findByIdAndDelete(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      message: "상품 삭제에 실패했습니다.",
    });
  }
});

export default router;