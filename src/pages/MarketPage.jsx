import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { getProductList } from "../services/ProductService.js";

function MarketPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [searchInput, setSearchInput] = useState("");
  const [keyword, setKeyword] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setPageSize(4);
      } else if (width < 1200) {
        setPageSize(6);
      } else {
        setPageSize(10);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const offset = (page - 1) * pageSize;

        const data = await getProductList({
          offset,
          limit: pageSize,
          keyword,
        });

        setProducts(data.products ?? []);
        setTotalCount(data.totalCount ?? 0);
      } catch (error) {
        console.error(error);
        setError("상품 목록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [page, pageSize, keyword]);

  const handleSearch = (event) => {
    event.preventDefault();

    setKeyword(searchInput.trim());
    setPage(1);
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <>
      <Header />

      <main className="market-page">
        <div className="market-title-row">
          <h1>판매 중인 상품</h1>

          <button
            type="button"
            className="register-button"
            onClick={() => navigate("/registration")}
          >
            상품 등록하기
          </button>
        </div>

        <form className="market-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="검색할 상품을 입력해주세요"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />

          <button type="submit">검색</button>
        </form>

        {loading && (
          <p className="market-message">
            상품을 불러오는 중입니다...
          </p>
        )}

        {error && (
          <p className="market-message market-error">
            {error}
          </p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="market-message">
            등록된 상품이 없습니다.
          </p>
        )}

        {!loading && !error && products.length > 0 && (
          <>
         <div className="product-grid">
  {products.map((product) => (
    <article
      className="product-card"
      key={product._id}
      onClick={() => navigate(`/items/${product._id}`)}
    >
      <img
        className="product-image"
        src="/default-product.png"
        alt={product.name}
      />

      <p className="product-name">
        {product.name}
      </p>

      <strong className="product-price">
        {Number(product.price).toLocaleString()}원
      </strong>
    </article>
  ))}
</div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  type="button"
                  onClick={handlePrevPage}
                  disabled={page === 1}
                >
                  이전
                </button>

                <span>
                  {page} / {totalPages}
                </span>

                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                >
                  다음
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

export default MarketPage;