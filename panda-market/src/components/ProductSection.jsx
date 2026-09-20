import { useEffect, useState } from 'react';
import styles from './ProductSection.module.scss';
import SearchBar from './SearchBar';
import SortDropdown from './SortDropdown';
import ProductList from './ProductList';
import Pagination from './Pagination';
import { getProducts } from '../services/productService';

const PAGE_SIZE = 10;

// 검색, 정렬, 페이지네이션을 포함한 판매 상품 목록 영역
function ProductSection() {
  // 현재 검색·정렬·페이지 조건과 API 응답 데이터를 저장
  const [keyword, setKeyword] = useState('');
  const [orderBy, setOrderBy] = useState('recent');
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    // 검색어, 정렬 기준, 페이지가 바뀔 때마다 상품 목록을 다시 요청
    const fetchProducts = async () => {
      try {
        const data = await getProducts({ page, pageSize: PAGE_SIZE, orderBy, keyword });
        setProducts(data.list);
        setTotalCount(data.totalCount);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [keyword, orderBy, page]);

  const handleKeywordChange = (value) => {
    // 새 검색은 첫 페이지부터 보여 주기
    setKeyword(value);
    setPage(1);
  };

  const handleOrderByChange = (value) => {
    // 정렬 변경도 첫 페이지부터 보여 주기
    setOrderBy(value);
    setPage(1);
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.top}>
          <h2>판매 중인 상품</h2>
          <div className={styles.toolbar}>
            <SearchBar keyword={keyword} onKeywordChange={handleKeywordChange} />
            <button className={styles.registerButton}>상품 등록하기</button>
            <SortDropdown orderBy={orderBy} onOrderByChange={handleOrderByChange} />
          </div>
        </div>
        <ProductList products={products} />
        <Pagination
          page={page}
          totalCount={totalCount}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </div>
    </section>
  );
}

export default ProductSection;
