import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api/products";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useProductFormValidation from "../hooks/useProductFormValidation";
import "./RegistrationPage.css";

function RegistrationPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [touched, setTouched] = useState({});
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const { errors, isValid } = useProductFormValidation({
    name,
    description,
    price,
    tag,
    tags,
  });

  function handleBlur(fieldName) {
    setTouched((previousTouched) => ({
      ...previousTouched,
      [fieldName]: true,
    }));
  }

  function handleTagKeyDown(event) {
    if (
      event.key !== "Enter" ||
      event.nativeEvent.isComposing ||
      event.keyCode === 229
    ) {
      return;
    }

    event.preventDefault();
    handleBlur("tag");

    const trimmedTag = tag.trim();

    if (
      !trimmedTag ||
      trimmedTag.length > 5 ||
      tags.includes(trimmedTag)
    ) {
      return;
    }

    setTags((previousTags) => [
      ...previousTags,
      trimmedTag,
    ]);

    setTag("");
  }

  function handleDeleteTag(tagToDelete) {
    setTags((previousTags) =>
      previousTags.filter(
        (savedTag) => savedTag !== tagToDelete
      )
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const product = await createProduct({
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        tags,
      });

      navigate(`/items/${product.id}`);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Header />

      <main className="registration-page">
        <form
          className="registration-form"
          onSubmit={handleSubmit}
        >
          <div className="registration-heading">
            <h1>상품 등록하기</h1>

            <button
              type="submit"
              className="submit-button"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? "등록 중" : "등록"}
            </button>
          </div>

          <div className="form-field">
            <label htmlFor="product-name">상품명</label>

            <input
              id="product-name"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              onBlur={() => {
                handleBlur("name");
              }}
              className={
                touched.name && errors.name
                  ? "input-error"
                  : ""
              }
              placeholder="상품명을 입력해주세요"
            />

            {touched.name && errors.name && (
              <p className="field-error">{errors.name}</p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="product-description">
              상품 소개
            </label>

            <textarea
              id="product-description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              onBlur={() => {
                handleBlur("description");
              }}
              className={
                touched.description && errors.description
                  ? "input-error"
                  : ""
              }
              placeholder="상품 소개를 입력해주세요"
            />

            {touched.description && errors.description && (
              <p className="field-error">
                {errors.description}
              </p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="product-price">판매가격</label>

            <input
              id="product-price"
              type="number"
              min="0"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
              onBlur={() => {
                handleBlur("price");
              }}
              className={
                touched.price && errors.price
                  ? "input-error"
                  : ""
              }
              placeholder="판매 가격을 입력해주세요"
            />

            {touched.price && errors.price && (
              <p className="field-error">{errors.price}</p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="product-tag">태그</label>

            <input
              id="product-tag"
              type="text"
              value={tag}
              onChange={(event) => {
                setTag(event.target.value);
              }}
              onKeyDown={handleTagKeyDown}
              onBlur={() => {
                handleBlur("tag");
              }}
              className={
                touched.tag && errors.tag
                  ? "input-error"
                  : ""
              }
              placeholder="태그를 입력한 후 Enter를 눌러주세요"
            />

            {touched.tag && errors.tag && (
              <p className="field-error">{errors.tag}</p>
            )}

            {tags.length > 0 && (
              <div className="tag-list">
                {tags.map((savedTag) => (
                  <div
                    className="tag-chip"
                    key={savedTag}
                  >
                    <span>{savedTag}</span>

                    <button
                      type="button"
                      onClick={() => {
                        handleDeleteTag(savedTag);
                      }}
                      aria-label={`${savedTag} 태그 삭제`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && (
            <p className="registration-error">{error}</p>
          )}
        </form>
      </main>

      <Footer />
    </>
  );
}

export default RegistrationPage;