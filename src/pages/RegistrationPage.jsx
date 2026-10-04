
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { createProduct } from "../api/products.js";
import useProductValidation from "../hooks/useProductValidation.js";
import "../styles/registration.css";

function RegistrationPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { errors, isValid } = useProductValidation({
    name,
    description,
    price,
    tagInput,
    tags,
  });

  const markTouched = (field) => {
    setTouched((previous) => ({
      ...previous,
      [field]: true,
    }));
  };

  const handleTagKeyDown = (event) => {
    if (event.key !== "Enter") return;

    event.preventDefault();
    markTouched("tags");

    const newTag = tagInput.trim();

    if (!newTag || newTag.length > 5) return;
    if (tags.includes(newTag)) {
      setTagInput("");
      return;
    }

    setTags((previous) => [...previous, newTag]);
    setTagInput("");
  };

  const removeTag = (tagToRemove) => {
    setTags((previous) =>
      previous.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setTouched({
      name: true,
      description: true,
      price: true,
      tags: true,
    });

    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const product = await createProduct({
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        tags,
      });

      navigate(`/items/${product.id}`);
    } catch (error) {
      console.error("상품 등록 오류:", error);
      setErrorMessage("상품 등록에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const requiredFieldsFilled =
    name.trim() !== "" &&
    description.trim() !== "" &&
    price !== "";

  return (
    <div className="market-page">
      <Header />

      <main className="market-main registration-main">
        <section className="registration-section">
          <h1 className="registration-title">상품 등록하기</h1>

          <form
            className="registration-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <label className="registration-field">
              <span className="registration-label">상품명</span>
              <input
                className="registration-control"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                onBlur={() => markTouched("name")}
                placeholder="상품명을 입력해주세요"
                aria-invalid={Boolean(touched.name && errors.name)}
                aria-describedby={touched.name && errors.name ? "product-name-error" : undefined}
              />
              {touched.name && errors.name && (
                <p className="registration-error" id="product-name-error">{errors.name}</p>
              )}
            </label>

            <label className="registration-field">
              <span className="registration-label">상품 소개</span>
              <textarea
                className="registration-control registration-description"
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                onBlur={() => markTouched("description")}
                placeholder="상품을 소개해주세요"
                rows={5}
                aria-invalid={Boolean(
                  touched.description && errors.description
                )}
                aria-describedby={touched.description && errors.description ? "product-description-error" : undefined}
              />
              {touched.description && errors.description && (
                <p className="registration-error" id="product-description-error">{errors.description}</p>
              )}
            </label>

            <label className="registration-field">
              <span className="registration-label">판매 가격</span>
              <input
                className="registration-control"
                type="number"
                inputMode="numeric"
                min="0"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                onBlur={() => markTouched("price")}
                placeholder="판매 가격을 입력해주세요"
                aria-invalid={Boolean(touched.price && errors.price)}
                aria-describedby={touched.price && errors.price ? "product-price-error" : undefined}
              />
              {touched.price && errors.price && (
                <p className="registration-error" id="product-price-error">{errors.price}</p>
              )}
            </label>

            <label className="registration-field">
              <span className="registration-label">태그</span>
              <input
                className="registration-control"
                type="text"
                value={tagInput}
                onChange={(event) => setTagInput(event.target.value)}
                onKeyDown={handleTagKeyDown}
                onBlur={() => markTouched("tags")}
                placeholder="태그 입력 후 Enter"
                aria-invalid={Boolean(touched.tags && errors.tags)}
                aria-describedby={touched.tags && errors.tags ? "product-tags-error" : undefined}
              />
              {touched.tags && errors.tags && (
                <p className="registration-error" id="product-tags-error">{errors.tags}</p>
              )}
            </label>

            <div className="registration-tags" aria-label="추가한 태그">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className="registration-tag"
                  onClick={() => removeTag(tag)}
                  aria-label={`${tag} 태그 삭제`}
                >
                  <span>#{tag}</span>
                  <span aria-hidden="true">×</span>
                </button>
              ))}
            </div>

            {errorMessage && (
              <p role="alert" className="registration-error registration-submit-error">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              className="registration-submit"
              disabled={
                !requiredFieldsFilled ||
                !isValid ||
                isSubmitting
              }
            >
              {isSubmitting ? "등록 중..." : "등록하기"}
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default RegistrationPage;
