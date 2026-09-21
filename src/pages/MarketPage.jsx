// src/pages/MarketPage.jsx

import { useEffect, useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";
import BestProductList from "../components/BestProductList";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

import { getProductList } from "../services/ProductService";
import useResponsivePageSize from "../hooks/useResponsivePageSize";

function MarketPage() {
  // 전체 상품
  const [products, setProducts] = useState([]);

  // 베스트 상품
  const [bestProducts, setBestProducts] = useState([]);

  // 현재 페이지
  const [page, setPage] = useState(1);

  // 전체 상품 개수
  const [totalCount, setTotalCount] = useState(0);

  // 정렬 기준
  const [orderBy, setOrderBy] = useState("recent");

  // 검색창에 입력하고 있는 값
  const [searchInput, setSearchInput] = useState("");

  // 실제 API 검색에 사용할 값
  const [keyword, setKeyword] = useState("");

  // 화면 크기에 따른 pageSize
  const pageSize = useResponsivePageSize();

  // 전체 상품 불러오기
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProductList({
          page,
          pageSize,
          orderBy,
          keyword,
        });

        setProducts(data.list);
        setTotalCount(data.totalCount);
      } catch (error) {
        console.error(error);
      }
    }

    loadProducts();
  }, [page, pageSize, orderBy, keyword]);

  // 베스트 상품 불러오기
  useEffect(() => {
    async function loadBestProducts() {
      try {
        const data = await getProductList({
          page: 1,
          pageSize: 4,
          orderBy: "favorite",
          keyword: "",
        });

        setBestProducts(data.list);
      } catch (error) {
        console.error(error);
      }
    }

    loadBestProducts();
  }, []);

  // 총 페이지 개수
  const totalPages = Math.ceil(
    totalCount / pageSize
  );

  // 검색
  const handleSearch = (e) => {
    e.preventDefault();

    setKeyword(searchInput);
    setPage(1);
  };

  return (
    <>
      <Header />

      <main className="market-page">
        {/* 베스트 상품 */}
        <section className="best-section">
          <h2>베스트 상품</h2>

          <BestProductList
            products={bestProducts}
          />
        </section>

        {/* 전체 상품 */}
        <section className="product-section">
          <div className="product-title-area">
            <h2>판매 중인 상품</h2>

            <SearchBar
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              onSearch={handleSearch}
            />

            <select
              value={orderBy}
              onChange={(e) => {
                setOrderBy(e.target.value);
                setPage(1);
              }}
            >
              <option value="recent">
                최신순
              </option>

              <option value="favorite">
                좋아요순
              </option>
            </select>
          </div>

          <ProductList products={products} />

          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        </section>
      </main>

      <Footer />
    </>
  );
}

export default MarketPage;