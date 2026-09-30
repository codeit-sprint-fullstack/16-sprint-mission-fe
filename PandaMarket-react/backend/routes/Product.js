// ======================================================================
// 4. 상품 API 파일 만들기
// ======================================================================
//
// backend/routes/products.js
//

import express from "express";
import Product from "../models/Product.js";

const router = express.Router();


// ======================================================================
// 4-1. POST /api/products
// 상품 등록
// ======================================================================

router.post("/", async (req, res) => {
  try {
    // 프론트가 보낸 body 꺼내기
    const { name, description, price, tags } = req.body;

    // 필수값 확인
    if (!name || !description || price === undefined) {
      return res.status(400).json({
        message: "name, description, price는 필수입니다.",
      });
    }

    // 가장 큰 id 찾기
    const lastProduct = await Product.findOne().sort({ id: -1 });

    // 다음 id 만들기
    const nextId = lastProduct ? lastProduct.id + 1 : 1;

    // 새 상품 만들기
    const newProduct = await Product.create({
      id: nextId,
      name,
      description,
      price,
      tags: tags ?? [],
    });

    // 새로 만들었기 때문에 201
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "상품 등록 중 오류가 발생했습니다.",
    });
  }
});


// ======================================================================
// 4-2. GET /api/products
// 상품 목록 가져오기
// ======================================================================

router.get("/", async (req, res) => {
  try {
    // 예:
    // /api/products?page=1&pageSize=10&keyword=맥북

    const { page = 1, pageSize = 10, keyword = "" } = req.query;

    // query string은 문자열이라 숫자로 변경
    const pageNumber = Number(page);
    const size = Number(pageSize);

    // 몇 개를 건너뛸지 계산
    const skip = (pageNumber - 1) * size;

    // 검색 조건
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

    // 상품 목록 가져오기
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(size);

    // 전체 상품 개수
    const totalCount = await Product.countDocuments(filter);

    // 프론트로 응답
    return res.status(200).json({
      list: products,
      totalCount,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "상품 목록을 불러오는 중 오류가 발생했습니다.",
    });
  }
});


// ======================================================================
// 4-3. GET /api/products/:id
// 상품 상세 조회
// ======================================================================
//
// 예:
//
// GET /api/products/3
//
// id가 3인 상품 하나를 가져옴
//

router.get("/:id", async (req, res) => {
  try {
    // 주소에서 id 꺼내기
    //
    // /api/products/3
    //               ↑
    //               req.params.id
    //
    // params는 문자열이기 때문에 Number로 변경

    const id = Number(req.params.id);

    // 숫자가 아닌 id가 들어온 경우
    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "올바른 상품 id를 입력해주세요.",
      });
    }

    // id가 같은 상품 하나 찾기
    const product = await Product.findOne({ id });

    // 상품이 없으면 404
    if (!product) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    // 상품 반환
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "상품 조회 중 오류가 발생했습니다.",
    });
  }
});


// ======================================================================
// 4-4. PATCH /api/products/:id
// 상품 수정
// ======================================================================
//
// 예:
//
// PATCH /api/products/3
//
// body:
//
// {
//   "name": "맥북 프로",
//   "price": 1500000
// }
//
// 보내면 id가 3인 상품의
// name과 price만 수정됨
//

router.patch("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    // 숫자가 아닌 id가 들어온 경우
    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "올바른 상품 id를 입력해주세요.",
      });
    }

    // id는 수정하면 안 되기 때문에 body에서 제외
    const { id: _, ...updateData } = req.body;

    // 상품 찾아서 수정
    const updatedProduct = await Product.findOneAndUpdate(
      { id: id }, // 어떤 상품?
      { $set: updateData }, // 무엇을 수정?
      {
        new: true, // 수정된 결과 반환
        runValidators: true, // 스키마 유효성 검사
      }
    );

    // 상품이 없으면 404
    if (!updatedProduct) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    // 수정된 상품 반환
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      message: "상품 수정 중 오류가 발생했습니다.",
    });
  }
});


// ======================================================================
// 4-5. DELETE /api/products/:id
// 상품 삭제
// ======================================================================
//
// 예:
//
// DELETE /api/products/3
//
// id가 3인 상품 삭제
//

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    // 숫자가 아닌 id가 들어온 경우
    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "올바른 상품 id를 입력해주세요.",
      });
    }

    // 상품 찾아서 삭제
    const deletedProduct = await Product.findOneAndDelete({
      id: id,
    });

    // 상품이 없으면 404
    if (!deletedProduct) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    // 삭제된 상품 반환
    return res.status(200).json(deletedProduct);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "상품 삭제 중 오류가 발생했습니다.",
    });
  }
});


// ======================================================================
// router 내보내기
// ======================================================================

export default router;