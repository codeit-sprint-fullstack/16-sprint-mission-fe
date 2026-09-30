// ======================================================================
// 2. RegistrationPage.jsx
// ======================================================================
//
// src/pages/RegistrationPage/RegistrationPage.jsx
// ======================================================================

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

import api from "../../services/api";

import useProductFormValidation from "../../hooks/useProductFormValidation";

import styles from "./RegistrationPage.module.scss";

function RegistrationPage() {
  const navigate = useNavigate();

  // ====================================================================
  // 입력값
  // ====================================================================

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [price, setPrice] = useState("");

  // 현재 입력 중인 태그
  const [tagText, setTagText] = useState("");

  // Enter로 등록된 태그
  const [tags, setTags] = useState([]);

  // ====================================================================
  // 사용자가 한 번이라도 입력했는지 확인
  // ====================================================================
  //
  // 처음 페이지 들어오자마자
  // 빨간 에러가 전부 뜨면 보기 안 좋음.
  //
  // 사용자가 해당 input을 건드린 뒤부터
  // 에러를 보여주기 위한 값.

  const [touched, setTouched] = useState({
    name: false,
    description: false,
    price: false,
    tag: false,
  });

  // 등록 중
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ====================================================================
  // Custom Hook
  // ====================================================================

  const { nameError, descriptionError, priceError, tagError, isFormValid } =
    useProductFormValidation({
      name,
      description,
      price,
      tagText,
      tags,
    });

  // ====================================================================
  // input을 건드렸다고 기록
  // ====================================================================

  const handleBlur = (field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  // ====================================================================
  // 태그 Enter
  // ====================================================================

  const handleTagKeyDown = (event) => {
    if (event.key !== "Enter") {
      return;
    }

    // Enter 때문에 form이 제출되는 것 막기
    event.preventDefault();

    const newTag = tagText.trim();

    // 태그 input을 건드렸다고 표시
    setTouched((prev) => ({
      ...prev,
      tag: true,
    }));

    // --------------------------------------------------
    // 아무것도 안 적었으면 추가 X
    // --------------------------------------------------

    if (!newTag) {
      return;
    }

    // --------------------------------------------------
    // 5글자 넘으면 추가 X
    // --------------------------------------------------

    if (newTag.length > 5) {
      return;
    }

    // --------------------------------------------------
    // 이미 같은 태그가 있다면 추가 X
    // --------------------------------------------------

    if (tags.includes(newTag)) {
      setTagText("");
      return;
    }

    // --------------------------------------------------
    // 태그 배열에 추가
    // --------------------------------------------------

    setTags((prevTags) => [...prevTags, newTag]);

    // input 비우기
    setTagText("");
  };

  // ====================================================================
  // 태그 삭제
  // ====================================================================

  const handleRemoveTag = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  // ====================================================================
  // 상품 등록
  // ====================================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 혹시 버튼 외 다른 방법으로 submit돼도
    // 잘못된 값이면 POST 보내지 않기
    if (!isFormValid) {
      return;
    }

    try {
      setIsSubmitting(true);

      // ================================================================
      // 내가 만든 POST API
      // ================================================================

      const response = await api.post("/products", {
        name,
        description,
        price: Number(price),
        tags,
      });

      // api interceptor가 있든 없든 대응
      const newProduct = response.data ?? response;

      // ================================================================
      // 등록 성공
      //
      // id가 7이면
      //
      // /items/7
      // ================================================================

      navigate(`/items/${newProduct.id}`);
    } catch (error) {
      console.error("상품 등록 실패:", error);

      alert("상품 등록에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* ============================================================
              제목 + 등록 버튼
          ============================================================= */}

          <div className={styles.top}>
            <h1 className={styles.title}>상품 등록하기</h1>

            <button
              type="submit"
              className={styles.submitButton}
              // ========================================================
              // ★ 핵심
              //
              // 하나라도 조건에 안 맞으면 disabled
              // ========================================================

              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? "등록 중..." : "등록"}
            </button>
          </div>

          {/* ============================================================
              상품명
          ============================================================= */}

          <div className={styles.field}>
            <label className={styles.label} htmlFor="name">
              상품명
            </label>

            <input
              id="name"
              type="text"
              className={`
                ${styles.input}
                ${touched.name && nameError ? styles.errorInput : ""}
              `}
              placeholder="상품명을 입력해주세요"
              value={name}
              onChange={(event) => setName(event.target.value)}
              onBlur={() => handleBlur("name")}
            />

            {/* 에러 메시지 */}

            {touched.name && nameError && (
              <p className={styles.errorMessage}>{nameError}</p>
            )}
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
              className={`
                ${styles.textarea}
                ${
                  touched.description && descriptionError
                    ? styles.errorInput
                    : ""
                }
              `}
              placeholder="상품 소개를 입력해주세요"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              onBlur={() => handleBlur("description")}
            />

            {touched.description && descriptionError && (
              <p className={styles.errorMessage}>{descriptionError}</p>
            )}
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
              // 숫자만 검사하기 쉽게 text 사용
              type="text"
              // 모바일에서는 숫자 키패드
              inputMode="numeric"
              className={`
                ${styles.input}
                ${touched.price && priceError ? styles.errorInput : ""}
              `}
              placeholder="판매 가격을 입력해주세요"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              onBlur={() => handleBlur("price")}
            />

            {touched.price && priceError && (
              <p className={styles.errorMessage}>{priceError}</p>
            )}
          </div>

          {/* ============================================================
              태그
          ============================================================= */}

          <div className={styles.field}>
            <label className={styles.label} htmlFor="tag">
              태그
            </label>

            <input
              id="tag"
              type="text"
              className={`
                ${styles.input}
                ${touched.tag && tagError ? styles.errorInput : ""}
              `}
              placeholder="태그를 입력해주세요"
              value={tagText}
              onChange={(event) => {
                setTagText(event.target.value);

                // 타이핑하기 시작하면
                // 바로 validation 표시
                setTouched((prev) => ({
                  ...prev,
                  tag: true,
                }));
              }}
              onKeyDown={handleTagKeyDown}
            />

            {/* 태그 글자 수 오류 */}

            {touched.tag && tagError && (
              <p className={styles.errorMessage}>{tagError}</p>
            )}

            {/* ==========================================================
                태그 칩
            =========================================================== */}

            {tags.length > 0 && (
              <div className={styles.tagList}>
                {tags.map((tag) => (
                  <div key={tag} className={styles.tag}>
                    <span>#{tag}</span>

                    <button
                      type="button"
                      className={styles.tagDeleteButton}
                      onClick={() => handleRemoveTag(tag)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}

export default RegistrationPage;
