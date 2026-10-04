import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();

const productFields = ["name", "description", "price", "tags"];

const isValidId = (value) => {
  return /^[1-9]\d*$/.test(value) &&
    Number.isSafeInteger(Number(value)) &&
    Number(value) <= 2147483647;
};

const isValidProductField = (field, value) => {
  switch (field) {
    case "name":
      return typeof value === "string" &&
        value.trim().length >= 1 &&
        value.trim().length <= 10;

    case "description":
      return typeof value === "string" &&
        value.trim().length >= 10 &&
        value.trim().length <= 100;

    case "price":
      return Number.isInteger(value) &&
        value >= 0 &&
        value <= 2147483647;

    case "tags":
      return Array.isArray(value) &&
        value.every(
          (tag) =>
            typeof tag === "string" &&
            tag.trim().length >= 1 &&
            tag.trim().length <= 5
        );

    default:
      return false;
  }
};

const handleError = (res, error) => {
  console.error("Product API error:", error);

  if (error.code === "P2025") {
    return res.status(404).json({
      message: "상품을 찾을 수 없습니다.",
    });
  }

  return res.status(500).json({
    message: "서버 오류가 발생했습니다.",
  });
};

// 상품 등록
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    if (
      !data ||
      typeof data !== "object" ||
      Array.isArray(data) ||
      !productFields.every((field) =>
        isValidProductField(field, data[field])
      )
    ) {
      return res.status(400).json({
        message: "상품 정보를 올바르게 입력해주세요.",
      });
    }

    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        tags: data.tags,
      },
    });

    return res.status(201).json(product);
  } catch (error) {
    return handleError(res, error);
  }
});

// 상품 목록 조회
router.get("/", async (req, res) => {
  try {
    const { keyword = "", orderBy = "recent" } = req.query;
    const offset = Number(req.query.offset ?? 0);
    const limit = Number(req.query.limit ?? 10);

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

    const where = keyword
      ? {
          OR: [
            {
              name: {
                contains: keyword,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: keyword,
                mode: "insensitive",
              },
            },
          ],
        }
      : {};

    const [totalCount, products] = await prisma.$transaction([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        skip: offset,
        take: limit,
        orderBy: [
          { createdAt: "desc" },
          { id: "desc" },
        ],
        select: {
          id: true,
          name: true,
          price: true,
          createdAt: true,
        },
      }),
    ]);

    return res.status(200).json({
      totalCount,
      list: products,
    });
  } catch (error) {
    return handleError(res, error);
  }
});

// 상품 상세 조회
router.get("/:id", async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        message: "올바르지 않은 상품 ID입니다.",
      });
    }

    const product = await prisma.product.findUnique({
      where: { id: Number(req.params.id) },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        tags: true,
        createdAt: true,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    return handleError(res, error);
  }
});

// 상품 수정
router.patch("/:id", async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        message: "올바르지 않은 상품 ID입니다.",
      });
    }

    const body = req.body;

    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {
      return res.status(400).json({
        message: "수정할 정보를 입력해주세요.",
      });
    }

    const updates = {};

    for (const field of productFields) {
      if (body[field] !== undefined) {
        if (!isValidProductField(field, body[field])) {
          return res.status(400).json({
            message: `${field} 필드가 올바르지 않습니다.`,
          });
        }

        updates[field] = body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "수정할 정보를 입력해주세요.",
      });
    }

    const product = await prisma.product.update({
      where: { id: Number(req.params.id) },
      data: updates,
    });

    return res.status(200).json(product);
  } catch (error) {
    return handleError(res, error);
  }
});

// 상품 삭제
router.delete("/:id", async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        message: "올바르지 않은 상품 ID입니다.",
      });
    }

    await prisma.product.delete({
      where: { id: Number(req.params.id) },
    });

    return res.status(204).send();
  } catch (error) {
    return handleError(res, error);
  }
});

export default router;