import "./ProductPage.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";
import { useState } from "react";
import Pagination from "../components/Pagination";
import useResponsivePageSize from "../hooks/useResponsivePageSize";




function ProductPage() {

    const [keyword, setKeyword] = useState("");
    const [orderBy, setOrderBy] = useState("recent");
    const [page, setPage] = useState(1);

    const pageSize = useResponsivePageSize();

    const {
  products: bestProducts,
  isLoading: isBestLoading,
  error: bestError,
} = useProducts({
  page: 1,
  pageSize: 4,
  orderBy: "favorite",
  keyword: "",
});


const {
  products,
  totalCount,
  isLoading,
  error,
} = useProducts({
  page,
  pageSize,
  orderBy,
  keyword,
});

  return (
    <>
      <Header />

      <div className="product-page">
        <main>
          <div className="market-container">
            <section className="best-products-section">
        <h2>베스트 상품</h2>

        <div className="best-products-list">
            {bestError ? (
            <p className="status-message">{bestError}</p>
            ) : isBestLoading ? (
            <p className="status-message">베스트 상품을 불러오는 중입니다.</p>
            ) : bestProducts.length === 0 ? (
            <p className="status-message">베스트 상품이 없습니다.</p>
            ) : (
            bestProducts.map((product) => (
                <ProductCard
                key={product.id}
                imageUrl={product.images[0]}
                name={product.name}
                price={product.price}
                favoriteCount={product.favoriteCount}
                />
            ))
            )}
        </div>
        </section>

            <section className="products-section">
              <div className="products-section-header">
                <h2>판매 중인 상품</h2>

                <div className="product-actions">
                <input
                    value={keyword}
                    onChange={(event) => {
                        setKeyword(event.target.value);
                        setPage(1);
                    }}
                    placeholder="검색할 상품을 입력해주세요"
                     />

                  <button type="button">상품 등록하기</button>

                <select
                    value={orderBy}
                    onChange={(event) => {
                        setOrderBy(event.target.value);
                        setPage(1);
                    }}
                    >
                    <option value="recent">최신순</option>
                    <option value="favorite">좋아요순</option>
                </select>
                </div>
              </div>

             <div className="all-products-list">
                {error ? (
                    <p className="status-message">{error}</p>
                ) : isLoading ? (
                    <p className="status-message">전체 상품을 불러오는 중입니다.</p>
                ) : products.length === 0 ? (
                    <p className="status-message">검색 결과가 없습니다.</p>
                ) : (
                    products.map((product) => (
                    <ProductCard
                        key={product.id}
                        imageUrl={product.images[0]}
                        name={product.name}
                        price={product.price}
                        favoriteCount={product.favoriteCount}
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