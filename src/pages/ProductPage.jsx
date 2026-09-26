import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";
import useResponsivePageSize from "../hooks/useResponsivePageSize";
import "./ProductPage.css";

function ProductPage() {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const pageSize = useResponsivePageSize();

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedKeyword(keyword);
      setPage(1);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [keyword]);

  const {
    products,
    totalCount,
    isLoading,
    error,
  } = useProducts({
    page,
    pageSize,
    keyword: debouncedKeyword,
  });

  return (
    <>
      <Header />

      <div className="product-page">
        <main>
          <div className="market-container">
            <section className="products-section">
              <div className="products-section-header">
                <h2>판매 중인 상품</h2>

                <div className="product-actions">
                  <input
                    value={keyword}
                    onChange={(event) => {
                      setKeyword(event.target.value);
                    }}
                    placeholder="검색할 상품을 입력해주세요"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      navigate("/registration");
                    }}
                  >
                    상품 등록하기
                  </button>
                </div>
              </div>

              <div className="all-products-list">
                {error ? (
                  <p className="status-message">{error}</p>
                ) : isLoading ? (
                  <p className="status-message">
                    상품을 불러오는 중입니다.
                  </p>
                ) : products.length === 0 ? (
                  <p className="status-message">
                    검색 결과가 없습니다.
                  </p>
                ) : (
                  products.map((product) => (
                    <ProductCard
                      key={product.id}
                      name={product.name}
                      price={product.price}
                    />
                  ))
                )}
              </div>

              <Pagination
                page={page}
                totalCount={totalCount}
                pageSize={pageSize}
                onPageChange={setPage}
              />
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default ProductPage;