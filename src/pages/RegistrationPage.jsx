import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api/products";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./RegistrationPage.css";

function RegistrationPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError("");

      const product = await createProduct({
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        tags: tag.trim() ? [tag.trim()] : [],
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
              disabled={isSubmitting}
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
              placeholder="상품명을 입력해주세요"
              required
            />
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
              placeholder="상품 소개를 입력해주세요"
              required
            />
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
              placeholder="판매 가격을 입력해주세요"
              required
            />
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
              placeholder="태그를 입력해주세요"
            />
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