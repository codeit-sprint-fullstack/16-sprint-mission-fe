import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import ProductCard from "../ProductCard/ProductCard";
import Pagination from "../Pagination/Pagination";
import styles from "./SellingProducts.module.scss";

const PAGE_SIZE = 10;

function SellingProducts() {
  // 페이지 이동
  const navigate = useNavigate();

  // ====================================================
  // 페이지
  // ====================================================
  const [page, setPage] = useState(1);
  // ====================================================
  // 검색
  // ====================================================
  const [searchText, setSearchText] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  // ====================================================
  // ❌ 좋아요순 없애기 - 이제 필요 없음
  // ====================================================

  // const [orderBy, setOrderBy] = useState("recent");

  const { products, totalCount, isLoading, error } = useProducts({
    page,
    pageSize: PAGE_SIZE,
    keyword: searchKeyword,
  });

  //====================================================
  ///전체 페이지 수
  //====================================================
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  // ====================================================
  // 검색 버튼
  // ====================================================
  const handleSearch = (event) => {
    event.preventDefault();

    setSearchKeyword(searchText.trim());
    setPage(1);
  };

  // ====================================================
  // ❌ 좋아요순/최신순 변경 함수 삭제
  // ====================================================
  // const handleOrderChange = (e) => {
  //   setOrderBy(e.target.value);
  //   setPage(1);
  // };

  // ====================================================
  // 화면
  // ====================================================
  return (
    <section className={styles.section}>
      <div className={styles.top}>
        <h2 className={styles.title}>판매 중인 상품</h2>

        <div className={styles.controls}>
          <form className={styles.searchForm} onSubmit={handleSearch}>
            <input
              className={styles.searchInput}
              type="search"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="상품을 검색해 보세요"
              aria-label="상품 검색어"
            />

            <button className={styles.searchButton} type="submit">
              검색
            </button>
          </form>
          {/* 상품 등록하기 */}
          <button
            className={styles.registrationButton}
            onClick={() => navigate("/registration")}
          >
            상품 등록하기
          </button>

          {/* ================================================
          ❌ 정렬 select 삭제
      ================================================= */}
          {/* <select
            className={styles.select}
            value={orderBy}
            onChange={handleOrderChange}
            aria-label="상품 정렬 방식"
          >
            <option value="recent">최신 순</option>
            <option value="favorite">좋아요 순</option>
          </select> */}
          
          {/* ==================================================
              좋아요순은 없애고 최신순 하나만 남김

              실제 정렬은 백엔드에서
              createdAt 최신순으로 하고 있으므로
              여기서는 화면 표시용으로만 둠.
          =================================================== */}

          <select className={styles.select} value="recent" disabled>
            <option value="recent">최신순</option>
          </select>
        </div>
      </div>

      {isLoading && <p className={styles.message}>상품을 불러오는 중입니다.</p>}

      {error && <p className={styles.error}>{error}</p>}

      {!isLoading && !error && products.length === 0 && (
        <p className={styles.message}>검색된 상품이 없습니다.</p>
      )}

      {!isLoading && !error && products.length > 0 && (
        <>
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </section>
  );
}

export default SellingProducts;
