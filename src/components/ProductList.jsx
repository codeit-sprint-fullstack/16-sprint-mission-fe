import useProducts from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import styles from "./ProductList.module.scss";
import { useState } from "react"
import useDeviceType from "../hooks/useDeviceType";

function ProductList() {
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const deviceType = useDeviceType();
  const pageSize = deviceType === "desktop" ? 10 : deviceType === "tablet" ? 6 : 4;

  const { products, totalCount, isLoading } = useProducts({
    page,
    pageSize,
    orderBy,
    keyword,
  });

  return (
    <section className="product-list">
      {isLoading ? (
        <p>로딩 중...</p>
      ) : (
        <>
        <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
          <option value="recent">최신순</option>
          <option value="favorite">좋아요순</option>
        </select>
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          />
        <div>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            이전
          </button>
          <span>{page}</span>
          <button
            disabled={page * pageSize >= totalCount}
            onClick={() => setPage(page + 1)}
            >
              다음
            </button>
        </div>  
        <div className={styles.grid}>
          <p>전체 {totalCount}개</p>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </>
      )}
    </section>
  );
}

export default ProductList;
