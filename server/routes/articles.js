import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();

const isValidId = (value) =>
  /^[1-9]\d*$/.test(value) &&
  Number.isSafeInteger(Number(value)) &&
  Number(value) <= 2147483647;

const isValidText = (value) =>
  typeof value === "string" &&
  value.trim().length > 0;

const handleError = (res, error) => {
  console.error("Article API error:", error);

  if (error.code === "P2025") {
    return res.status(404).json({
      message: "게시글을 찾을 수 없습니다.",
    });
  }

  return res.status(500).json({
    message: "서버 오류가 발생했습니다.",
  });
};

const articleSelect = {
  id: true,
  title: true,
  content: true,
  createdAt: true,
};

// 게시글 등록
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body ?? {};

    if (!isValidText(title) || !isValidText(content)) {
      return res.status(400).json({
        message: "제목과 내용을 입력해주세요.",
      });
    }

    const article = await prisma.article.create({
      data: {
        title: title.trim(),
        content: content.trim(),
      },
    });

    return res.status(201).json(article);
  } catch (error) {
    return handleError(res, error);
  }
});

// 게시글 목록 조회
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

    // PostgreSQL LIKE 와일드카드 문자 이스케이프
    const safeKeyword = keyword.replace(
      /[\\%_]/g,
      "\\$&"
    );

    const where = safeKeyword
      ? {
          OR: [
            {
              title: {
                contains: safeKeyword,
                mode: "insensitive",
              },
            },
            {
              content: {
                contains: safeKeyword,
                mode: "insensitive",
              },
            },
          ],
        }
      : {};

    const [totalCount, articles] = await prisma.$transaction([
      prisma.article.count({ where }),
      prisma.article.findMany({
        where,
        skip: offset,
        take: limit,
        orderBy: [
          { createdAt: "desc" },
          { id: "desc" },
        ],
        select: articleSelect,
      }),
    ]);

    return res.status(200).json({
      totalCount,
      list: articles,
    });
  } catch (error) {
    return handleError(res, error);
  }
});

// 게시글 상세 조회
router.get("/:id", async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        message: "올바르지 않은 게시글 ID입니다.",
      });
    }

    const article = await prisma.article.findUnique({
      where: { id: Number(req.params.id) },
      select: articleSelect,
    });

    if (!article) {
      return res.status(404).json({
        message: "게시글을 찾을 수 없습니다.",
      });
    }

    return res.status(200).json(article);
  } catch (error) {
    return handleError(res, error);
  }
});

// 게시글 수정
router.patch("/:id", async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        message: "올바르지 않은 게시글 ID입니다.",
      });
    }

    const { title, content } = req.body ?? {};
    const updates = {};

    if (title !== undefined) {
      if (!isValidText(title)) {
        return res.status(400).json({
          message: "제목을 올바르게 입력해주세요.",
        });
      }
      updates.title = title.trim();
    }

    if (content !== undefined) {
      if (!isValidText(content)) {
        return res.status(400).json({
          message: "내용을 올바르게 입력해주세요.",
        });
      }
      updates.content = content.trim();
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "수정할 내용을 입력해주세요.",
      });
    }

    const article = await prisma.article.update({
      where: { id: Number(req.params.id) },
      data: updates,
    });

    return res.status(200).json(article);
  } catch (error) {
    return handleError(res, error);
  }
});

// 게시글 삭제
router.delete("/:id", async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        message: "올바르지 않은 게시글 ID입니다.",
      });
    }

    await prisma.article.delete({
      where: { id: Number(req.params.id) },
    });

    return res.status(204).send();
  } catch (error) {
    return handleError(res, error);
  }
});

export default router;