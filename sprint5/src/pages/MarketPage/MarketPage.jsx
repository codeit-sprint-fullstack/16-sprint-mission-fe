import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import Pagination from "../../components/Pagination/Pagination";
import Footer from "../../components/Footer/Footer";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./MarketPage.module.scss";
import { getProducts } from "../../api/productApi";
import usePageSize from "../../hooks/usePageSize";


const MarketPage = () => {
  const [bestProducts, setBestProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderBy, setOrderBy] = useState("recent");
  const [searchInput, setSearchInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const { productPageSize, bestPageSize } = usePageSize();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // const bestData = await getProducts({
        //   page: 1,
        //   pageSize: bestPageSize,
        //   orderBy: "favorite",
        // });

        const offset = (pageNumber - 1) * productPageSize;

        const productData = await getProducts({
          offset,
          limit: productPageSize,
          keyword,
          // orderBy,
        });

        // setBestProducts(bestData.list);
        setProducts(productData.list);
        setTotalCount(productData.totalCount);
      } catch (error) {
        console.error(error);
      }
    };

    loadProducts();
  }, [pageNumber, productPageSize, keyword]);




  //사이즈 바꼈을때 1페이지로 가는거
  useEffect(() => {
    setPageNumber(1);
  }, [productPageSize]);







  return (
    <>
      <Header />

      <main className={styles.main}>
        {/* <section className={styles.bestSection}>
          <h2 className={styles.sectionTitle}>베스트 상품</h2>

          <div className={styles.bestGrid}>
            {bestProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section> */}

        <section className={styles.productSection}>
          <div className={styles.productToolbar}>
            <div className={styles.toolbarTop}>
              <h2 className={`${styles.sectionTitle} ${styles.productTitle}`}>
                판매 중인 상품
              </h2>
              <Link
                to="/registration"
                className={styles.addButton}
              >
                상품 등록하기
              </Link>
            </div>
            <div className={styles.toolbarBottom}>

              {/* 검색바 */}
              <SearchBar
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                // onSearch={handleSearch}
                setKeyword={setKeyword}
                setPageNumber={setPageNumber}
              />

              {/* 정렬바 */}
              <SortDropdown
                orderBy={orderBy}
                setPageNumber={setPageNumber}
              />

            </div>
          </div>

          <div className={styles.productGrid}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
          <Pagination
            pageNumber={pageNumber}
            totalCount={totalCount}
            onPageChange={setPageNumber}
            productPageSize={productPageSize}
          />
        </section>
      </main>

      <Footer />
    </>
  );
}

export default MarketPage;
