import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { createProduct } from "../services/ProductService.js";
import useProductValidation from "../hooks/useProductValidation.js";

function RegistrationPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [touched, setTouched] = useState({
    name: false,
    description: false,
    price: false,
    tag: false,
  });

  const { errors, isValid } = useProductValidation({
    name,
    description,
    price,
    tagInput,
    tags,
  });

  const handleBlur = (field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleTagKeyDown = (event) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();

    const newTag = tagInput.trim();

    setTouched((prev) => ({
      ...prev,
      tag: true,
    }));

    if (!newTag) {
      return;
    }

    if (newTag.length > 5) {
      return;
    }

    if (tags.includes(newTag)) {
      setTagInput("");
      return;
    }

    setTags((prevTags) => [
      ...prevTags,
      newTag,
    ]);

    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags((prevTags) =>
      prevTags.filter(
        (tag) => tag !== tagToRemove
      )
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setTouched({
      name: true,
      description: true,
      price: true,
      tag: true,
    });

    if (!isValid) {
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError("");

      const product = await createProduct({
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        tags,
      });

      navigate(`/items/${product._id}`);
    } catch (error) {
      console.error(error);

      setSubmitError(
        "상품 등록에 실패했습니다."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <main className="registration-page">
        <form
          className="registration-form"
          onSubmit={handleSubmit}
        >
          <div className="registration-title-row">
            <h1>상품 등록하기</h1>

            <button
              type="submit"
              className="registration-submit-button"
              disabled={!isValid || submitting}
            >
              {submitting
                ? "등록 중..."
                : "등록"}
            </button>
          </div>

          {/* 상품명 */}
          <div className="registration-field">
            <label htmlFor="name">
              상품명
            </label>

            <input
              id="name"
              type="text"
              placeholder="상품명을 입력해주세요"
              value={name}
              className={
                touched.name && errors.name
                  ? "input-error"
                  : ""
              }
              onChange={(event) =>
                setName(event.target.value)
              }
              onBlur={() =>
                handleBlur("name")
              }
            />

            {touched.name && errors.name && (
              <p className="field-error-message">
                {errors.name}
              </p>
            )}
          </div>

          {/* 상품 소개 */}
          <div className="registration-field">
            <label htmlFor="description">
              상품 소개
            </label>

            <textarea
              id="description"
              placeholder="상품 소개를 입력해주세요"
              value={description}
              className={
                touched.description &&
                errors.description
                  ? "input-error"
                  : ""
              }
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              onBlur={() =>
                handleBlur("description")
              }
            />

            {touched.description &&
              errors.description && (
                <p className="field-error-message">
                  {errors.description}
                </p>
              )}
          </div>

          {/* 판매 가격 */}
          <div className="registration-field">
            <label htmlFor="price">
              판매 가격
            </label>

            <input
              id="price"
              type="text"
              inputMode="numeric"
              placeholder="판매 가격을 입력해주세요"
              value={price}
              className={
                touched.price &&
                errors.price
                  ? "input-error"
                  : ""
              }
              onChange={(event) =>
                setPrice(event.target.value)
              }
              onBlur={() =>
                handleBlur("price")
              }
            />

            {touched.price &&
              errors.price && (
                <p className="field-error-message">
                  {errors.price}
                </p>
              )}
          </div>

          {/* 태그 */}
          <div className="registration-field">
            <label htmlFor="tag">
              태그
            </label>

            <input
              id="tag"
              type="text"
              placeholder="태그를 입력하고 Enter를 눌러주세요"
              value={tagInput}
              className={
                touched.tag && errors.tag
                  ? "input-error"
                  : ""
              }
              onChange={(event) =>
                setTagInput(
                  event.target.value
                )
              }
              onKeyDown={handleTagKeyDown}
              onBlur={() =>
                handleBlur("tag")
              }
            />

            {touched.tag && errors.tag && (
              <p className="field-error-message">
                {errors.tag}
              </p>
            )}

            <div className="tag-list">
              {tags.map((tag) => (
                <button
                  type="button"
                  className="tag-chip"
                  key={tag}
                  onClick={() =>
                    handleRemoveTag(tag)
                  }
                >
                  #{tag} ×
                </button>
              ))}
            </div>

            {touched.tag &&
              tags.length === 0 &&
              !errors.tag && (
                <p className="field-error-message">
                  태그를 하나 이상 입력해주세요.
                </p>
              )}
          </div>

          {submitError && (
            <p className="registration-error">
              {submitError}
            </p>
          )}
        </form>
      </main>

      <Footer />
    </>
  );
}

export default RegistrationPage;