import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ProductCard from "../components/ProductCard.jsx";
import SortDropdown from "../components/SortDropdown.jsx";
import { getProducts } from "../api/products.js";
import usePageSize from "../hooks/usePageSize.js";

function MarketPage() {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const requestIdRef = useRef(0);
  const { productPageSize: pageSize } = usePageSize();

  // 상품 목록 조회
  useEffect(() => {
    const fetchProducts = async () => {
      const requestId = ++requestIdRef.current;

      setErrorMessage("");

      try {
        const productData = await getProducts({
          page,
          pageSize,
          orderBy,
          keyword,
        });

        if (requestId !== requestIdRef.current) {
          return;
        }

        setProducts(productData.list);
        setTotalCount(productData.totalCount);
      } catch (error) {
        if (requestId !== requestIdRef.current) {
          return;
        }

        console.error("상품 조회 오류:", error);
        setProducts([]);
        setTotalCount(0);
        setErrorMessage(
          "상품 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요."
        );
      }
    };

    fetchProducts();

    return () => {
      requestIdRef.current++;
    };
  }, [page, keyword, orderBy, pageSize]);

  // 검색 조건이나 화면 크기가 바뀌면 첫 페이지로 이동
  useEffect(() => {
    setPage(1);
  }, [keyword, orderBy, pageSize]);

  const totalPages = Math.ceil(totalCount / pageSize);
  const pageGroup = Math.floor((page - 1) / 5);
  const startPage = pageGroup * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPages);

  return (
    <div className="market-page">
      <Header />

      <main className="market-main">
        <section className="market-section">
          <div className="market-toolbar">
            <div className="market-toolbar-top">
              <h2 className="market-section-title">
                판매 중인 상품
              </h2>

              <Link
                to="/registration"
                className="market-register-button"
              >
                상품 등록하기
              </Link>
            </div>

            <div className="market-toolbar-bottom">
              <label className="market-search-wrap">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
                </svg>

                <input
                  className="market-search"
                  type="text"
                  aria-label="상품 검색"
                  placeholder="검색할 상품을 입력해주세요"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </label>

              <SortDropdown
                value={orderBy}
                onChange={setOrderBy}
              />
            </div>
          </div>

          {errorMessage ? (
            <p className="market-error-message">
              {errorMessage}
            </p>
          ) : products.length === 0 ? (
            <p className="market-error-message">
              등록된 상품이 없습니다.
            </p>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  image={null}
                  name={product.name}
                  price={product.price}
                />
              ))}
            </div>
          )}
        </section>

        {!errorMessage && totalPages > 0 && (
          <div className="pagination">
            <button
              className="pagination-arrow"
              aria-label="이전 페이지 그룹"
              onClick={() =>
                setPage(Math.max(1, startPage - 1))
              }
              disabled={startPage === 1}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            {Array.from(
              { length: endPage - startPage + 1 },
              (_, index) => {
                const pageNumber = startPage + index;

                return (
                  <button
                    key={pageNumber}
                    className={
                      page === pageNumber ? "active" : ""
                    }
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              }
            )}

            <button
              className="pagination-arrow"
              aria-label="다음 페이지 그룹"
              onClick={() =>
                setPage(Math.min(totalPages, endPage + 1))
              }
              disabled={endPage === totalPages}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default MarketPage;