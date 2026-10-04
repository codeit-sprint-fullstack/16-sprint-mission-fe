import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

const isValidProductField = (field, value) => {
  switch (field) {
    case "name":
      return typeof value === "string" && value.trim().length >= 1 && value.trim().length <= 10;
    case "description":
      return typeof value === "string" && value.trim().length >= 10 && value.trim().length <= 100;
    case "price":
      return typeof value === "number" && Number.isFinite(value) && value >= 0;
    case "tags":
      return Array.isArray(value) && value.every(
        (tag) => typeof tag === "string" && tag.trim().length >= 1 && tag.trim().length <= 5
      );
    default:
      return false;
  }
};

// 상품 등록
router.post("/", async (req, res) => {
  try {
    const { name, description, price, tags } = req.body;

    // 필수 입력값 검사
    if (
      !isValidProductField("name", name) ||
      !isValidProductField("description", description) ||
      !isValidProductField("price", price) ||
      !isValidProductField("tags", tags)
    ) {
      return res.status(400).json({
        message: "상품 정보를 올바르게 입력해주세요.",
      });
    }

    // MongoDB에 상품 저장
    const product = await Product.create({
      name,
      description,
      price,
      tags,
    });

    // 등록된 상품 반환
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
    console.error("상품 등록 오류:", error);

    return res.status(500).json({
      message: "상품 등록 중 오류가 발생했습니다.",
    });
  }
});

// 상품 목록 조회
router.get("/", async (req, res) => {
  try {
    const { keyword = "", orderBy = "recent" } = req.query;
    const offset = Number(req.query.offset ?? 0);
    const limit = Number(req.query.limit ?? 10);

    // 페이지네이션 및 정렬 검증
    if (
      !Number.isSafeInteger(offset) ||
      offset < 0 ||
      !Number.isSafeInteger(limit) ||
      limit < 1 ||
      limit > 100 ||
      typeof keyword !== "string" ||
      orderBy !== "recent"
    ) {
      return res.status(400).json({
        message: "잘못된 조회 조건입니다.",
      });
    }

    // 상품명과 설명에서 검색
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const filter = keyword
      ? {
          $or: [
            { name: { $regex: escapedKeyword, $options: "i" } },
            { description: { $regex: escapedKeyword, $options: "i" } },
          ],
        }
      : {};

    // 전체 개수와 현재 페이지 상품 조회
    const [totalCount, products] = await Promise.all([
      Product.countDocuments(filter),
      Product.find(filter)
        .sort({ createdAt: -1, _id: -1 })
        .skip(offset)
        .limit(limit),
    ]);

    return res.status(200).json({
      totalCount,
      list: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        createdAt: product.createdAt,
      })),
    });
  } catch (error) {
    console.error("상품 목록 조회 오류:", error);

    return res.status(500).json({
      message: "상품 목록 조회 중 오류가 발생했습니다.",
    });
  }
});

// 상품 상세 조회
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // 올바른 MongoDB ID인지 확인
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        message: "올바르지 않은 상품 ID입니다.",
      });
    }

    const product = await Product.findById(id);

    // 해당 상품이 없는 경우
    if (!product) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    return res.status(200).json({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
      createdAt: product.createdAt,
    });
  } catch (error) {
    console.error("상품 상세 조회 오류:", error);

    return res.status(500).json({
      message: "상품 상세 조회 중 오류가 발생했습니다.",
    });
  }
});

// 상품 수정
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, tags } = req.body;

    // MongoDB ID 검증
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        message: "올바르지 않은 상품 ID입니다.",
      });
    }

    // 수정 가능한 필드만 허용
    const updates = {};

    if (name !== undefined) {
      if (!isValidProductField("name", name)) {
        return res.status(400).json({
          message: "상품 이름을 올바르게 입력해주세요.",
        });
      }

      updates.name = name;
    }

    if (description !== undefined) {
      if (!isValidProductField("description", description)) {
        return res.status(400).json({
          message: "상품 설명을 올바르게 입력해주세요.",
        });
      }

      updates.description = description;
    }

    if (price !== undefined) {
      if (!isValidProductField("price", price)) {
        return res.status(400).json({
          message: "상품 가격을 올바르게 입력해주세요.",
        });
      }

      updates.price = price;
    }

    if (tags !== undefined) {
      if (!isValidProductField("tags", tags)) {
        return res.status(400).json({
          message: "상품 태그를 올바르게 입력해주세요.",
        });
      }

      updates.tags = tags;
    }

    // 수정할 값이 없는 경우
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "수정할 상품 정보를 입력해주세요.",
      });
    }

    const product = await Product.findByIdAndUpdate(
      id,
      updates,
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

    return res.status(200).json({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  } catch (error) {
    console.error("상품 수정 오류:", error);

    return res.status(500).json({
      message: "상품 수정 중 오류가 발생했습니다.",
    });
  }
});

// 상품 삭제
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // MongoDB ID 검증
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        message: "올바르지 않은 상품 ID입니다.",
      });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    // 삭제 성공: 응답 본문 없음
    return res.status(204).send();
  } catch (error) {
    console.error("상품 삭제 오류:", error);

    return res.status(500).json({
      message: "상품 삭제 중 오류가 발생했습니다.",
    });
  }
});

export default router;
