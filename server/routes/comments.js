import express from "express";
import prisma from "../lib/prisma.js";

const isValidId = (value) =>
  typeof value === "string" &&
  /^[1-9]\d*$/.test(value) &&
  Number.isSafeInteger(Number(value)) &&
  Number(value) <= 2147483647;

const isValidContent = (value) =>
  typeof value === "string" &&
  value.trim().length >= 1 &&
  value.trim().length <= 1000;

const commentSelect = {
  id: true,
  content: true,
  createdAt: true,
};

const handleError = (res, error) => {
  console.error("Comment API error:", error);

  if (error.code === "P2025") {
    return res.status(404).json({
      message: "댓글 또는 연결된 게시물을 찾을 수 없습니다.",
    });
  }

  if (error.code === "P2003") {
    return res.status(404).json({
      message: "연결된 게시물을 찾을 수 없습니다.",
    });
  }

  return res.status(500).json({
    message: "서버 오류가 발생했습니다.",
  });
};

// 상품과 게시글에서 공통으로 사용하는 댓글 라우터
export const createParentCommentsRouter = (type) => {
  const router = express.Router({ mergeParams: true });

  const model = type === "product"
    ? prisma.product
    : prisma.article;

  const foreignKey = type === "product"
    ? "productId"
    : "articleId";

  const findParent = (id) =>
    model.findUnique({
      where: { id },
      select: { id: true },
    });

  // 댓글 등록
  router.post("/", async (req, res) => {
    try {
      const { id } = req.params;
      const { content } = req.body ?? {};

      if (!isValidId(id)) {
        return res.status(400).json({
          message: "올바르지 않은 게시물 ID입니다.",
        });
      }

      if (!isValidContent(content)) {
        return res.status(400).json({
          message: "댓글은 1~1000자로 입력해주세요.",
        });
      }

      const parentId = Number(id);
      const parent = await findParent(parentId);

      if (!parent) {
        return res.status(404).json({
          message: "게시물을 찾을 수 없습니다.",
        });
      }

      const comment = await prisma.comment.create({
        data: {
          content: content.trim(),
          [foreignKey]: parentId,
        },
      });

      return res.status(201).json(comment);
    } catch (error) {
      return handleError(res, error);
    }
  });

  // 댓글 목록 조회 (cursor 페이지네이션)
  router.get("/", async (req, res) => {
    try {
      const { id } = req.params;
      const { cursor } = req.query;
      const limit = Number(req.query.limit ?? 10);

      if (!isValidId(id)) {
        return res.status(400).json({
          message: "올바르지 않은 게시물 ID입니다.",
        });
      }

      if (
        !Number.isSafeInteger(limit) ||
        limit < 1 ||
        limit > 100 ||
        (cursor !== undefined && !isValidId(cursor))
      ) {
        return res.status(400).json({
          message: "잘못된 페이지네이션 조건입니다.",
        });
      }

      const parentId = Number(id);
      const parent = await findParent(parentId);

      if (!parent) {
        return res.status(404).json({
          message: "게시물을 찾을 수 없습니다.",
        });
      }

      const where = { [foreignKey]: parentId };

      // 다른 게시물의 댓글 커서는 사용할 수 없음
      if (cursor !== undefined) {
        const cursorComment = await prisma.comment.findFirst({
          where: {
            ...where,
            id: Number(cursor),
          },
          select: { id: true },
        });

        if (!cursorComment) {
          return res.status(400).json({
            message: "유효하지 않은 댓글 커서입니다.",
          });
        }
      }

      const comments = await prisma.comment.findMany({
        where,
        take: limit + 1,
        ...(cursor !== undefined
          ? {
              cursor: { id: Number(cursor) },
              skip: 1,
            }
          : {}),
        orderBy: { id: "desc" },
        select: commentSelect,
      });

      const hasNext = comments.length > limit;
      const list = comments.slice(0, limit);

      return res.status(200).json({
        list,
        nextCursor: hasNext
          ? list[list.length - 1].id
          : null,
      });
    } catch (error) {
      return handleError(res, error);
    }
  });

  return router;
};

// 댓글 수정·삭제 공통 API
export const commentRouter = express.Router();

// 댓글 수정
commentRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body ?? {};

    if (!isValidId(id)) {
      return res.status(400).json({
        message: "올바르지 않은 댓글 ID입니다.",
      });
    }

    if (!isValidContent(content)) {
      return res.status(400).json({
        message: "댓글은 1~1000자로 입력해주세요.",
      });
    }

    const comment = await prisma.comment.update({
      where: { id: Number(id) },
      data: { content: content.trim() },
    });

    return res.status(200).json(comment);
  } catch (error) {
    return handleError(res, error);
  }
});

// 댓글 삭제
commentRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        message: "올바르지 않은 댓글 ID입니다.",
      });
    }

    await prisma.comment.delete({
      where: { id: Number(id) },
    });

    return res.status(204).send();
  } catch (error) {
    return handleError(res, error);
  }
});