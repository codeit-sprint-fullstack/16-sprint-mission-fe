import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, description, price, tags } = req.body;

    if (
      !name?.trim() ||
      !description?.trim() ||
      price === undefined ||
      !Array.isArray(tags)
    ) {
      return res.status(400).json({
        message: "name, description, price, tags를 올바르게 입력해주세요.",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      tags,
    });

    return res.status(201).json({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "상품을 등록하는 중 오류가 발생했습니다.",
    });
  }
});


router.get("/", async (req, res) => {
  try {
    const offset = Number(req.query.offset ?? 0);
    const limit = Number(req.query.limit ?? 10);
    const orderBy = req.query.orderBy ?? "recent";
    const keyword = String(req.query.keyword ?? "").trim();

    if (
      !Number.isInteger(offset) ||
      offset < 0 ||
      !Number.isInteger(limit) ||
      limit < 1 ||
      limit > 100
    ) {
      return res.status(400).json({
        message: "offset과 limit을 올바르게 입력해주세요.",
      });
    }

    if (orderBy !== "recent") {
      return res.status(400).json({
        message: "orderBy는 recent만 사용할 수 있습니다.",
      });
    }

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

    const [products, totalCount] = await Promise.all([
      Product.find(filter)
        .select("id name price createdAt -_id")
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit),
      Product.countDocuments(filter),
    ]);

    return res.status(200).json({
      list: products,
      totalCount,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "상품 목록을 조회하는 중 오류가 발생했습니다.",
    });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({
      id: req.params.id,
    }).select("id name description price tags createdAt -_id");

    if (!product) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "상품을 조회하는 중 오류가 발생했습니다.",
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const allowedFields = ["name", "description", "price", "tags"];

    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([key]) =>
        allowedFields.includes(key)
      )
    );

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "수정할 상품 정보를 입력해주세요.",
      });
    }

    const product = await Product.findOneAndUpdate(
      { id: req.params.id },
      updates,
      {
        new: true,
        runValidators: true,
      }
    ).select("id name description price tags createdAt updatedAt -_id");

    if (!product) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "상품을 수정하는 중 오류가 발생했습니다.",
    });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      id: req.params.id,
    });

    if (!product) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    return res.status(200).json({
      id: product.id,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "상품을 삭제하는 중 오류가 발생했습니다.",
    });
  }
});

export default router;