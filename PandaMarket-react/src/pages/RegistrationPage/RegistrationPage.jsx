// ======================================================
// 3. 상품 등록 페이지 파일 만들기
// src/pages/RegistrationPage/RegistrationPage.jsx
// ======================================================================

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import Header from "../../components/header/header";

import styles from "./RegistrationPage.module.scss";

function RegistrationPage() {
  // ====================================================================
  // 등록 성공 후 페이지 이동할 때 사용
  // ====================================================================

  const navigate = useNavigate();

  // ====================================================================
  // 상품명
  // ====================================================================

  const [name, setName] = useState("");

  // ====================================================================
  // 상품 소개
  // ====================================================================

  const [description, setDescription] = useState("");

  // ====================================================================
  // 판매 가격
  // ====================================================================

  const [price, setPrice] = useState("");

  // ====================================================================
  // 태그
  //
  // 지금은 심화의 "태그 칩"을 만들지 않음.
  //
  // 그냥:
  //
  // 전자제품, 노트북, 애플
  //
  // 이렇게 입력받음.
  // ====================================================================

  const [tags, setTags] = useState("");

  // ====================================================================
  // 등록 중인지
  // ====================================================================

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ====================================================================
  // 등록하기
  // ====================================================================

  const handleSubmit = async (e) => {
    // form의 기본 새로고침 막기
    e.preventDefault();

    try {
      setIsSubmitting(true);

      // ================================================================
      // 태그 문자열을 배열로 변경
      // ================================================================
      //
      // 입력:
      //
      // "전자제품, 노트북, 애플"
      //
      //        ↓
      //
      // split(",")
      //
      //        ↓
      //
      // ["전자제품", " 노트북", " 애플"]
      //
      //        ↓
      //
      // trim()
      //
      //        ↓
      //
      // ["전자제품", "노트북", "애플"]

      const tagList = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      // ================================================================
      // 내 Express 서버에 상품 등록 요청
      // ================================================================
      //
      // api.js의 baseURL:
      //
      // http://localhost:3000/api
      //
      // 이므로
      //
      // api.post("/products")
      //
      // 실제 요청:
      //
      // POST http://localhost:3000/api/products

      const response = await api.post("/products", {
        name: name,

        description: description,

        // input 값은 문자열이므로 숫자로 변경
        price: Number(price),

        tags: tagList,
      });

      // ================================================================
      // 서버에서 받은 새 상품
      // ================================================================
      //
      // response.data
      //
      // 예:
      //
      // {
      //   id: 5,
      //   name: "맥북",
      //   description: "상태 좋아요",
      //   price: 900000,
      //   tags: ["전자제품"]
      // }

      const newProduct = response.data;

      // ================================================================
      // 등록 성공 후 상품 상세 페이지로 이동
      // ================================================================
      //
      // newProduct.id = 5
      //
      //        ↓
      //
      // /items/5

      navigate(`/items/${newProduct.id}`);
    } catch (error) {
      console.error("상품 등록 실패:", error);

      alert("상품 등록에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ================================================================
          Header
      ================================================================= */}

      <Header />

      {/* ================================================================
          상품 등록 페이지
      ================================================================= */}

      <main className={styles.container}>
        {/* ==============================================================
            제목 + 등록 버튼
        =============================================================== */}

        <div className={styles.titleArea}>
          <h1 className={styles.title}>상품 등록하기</h1>

          <button
            type="submit"
            form="registration-form"
            className={styles.submitButton}
          >
            {isSubmitting ? "등록 중..." : "등록"}
          </button>
        </div>

        {/* ==============================================================
            상품 등록 폼
        =============================================================== */}

        <form
          id="registration-form"
          className={styles.form}
          onSubmit={handleSubmit}
        >
          {/* ============================================================
              상품명
          ============================================================= */}

          <div className={styles.field}>
            <label className={styles.label} htmlFor="name">
              상품명
            </label>

            <input
              id="name"
              className={styles.input}
              type="text"
              placeholder="상품명을 입력해주세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* ============================================================
              상품 소개
          ============================================================= */}

          <div className={styles.field}>
            <label className={styles.label} htmlFor="description">
              상품 소개
            </label>

            <textarea
              id="description"
              className={styles.textarea}
              placeholder="상품 소개를 입력해주세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* ============================================================
              판매 가격
          ============================================================= */}

          <div className={styles.field}>
            <label className={styles.label} htmlFor="price">
              판매 가격
            </label>

            <input
              id="price"
              className={styles.input}
              type="number"
              placeholder="판매 가격을 입력해주세요"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          {/* ============================================================
              태그
          ============================================================= */}

          <div className={styles.field}>
            <label className={styles.label} htmlFor="tags">
              태그
            </label>

            <input
              id="tags"
              className={styles.input}
              type="text"
              placeholder="태그를 쉼표(,)로 구분해주세요"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </form>
      </main>
    </>
  );
}

export default RegistrationPage;
