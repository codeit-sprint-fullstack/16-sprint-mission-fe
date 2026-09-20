import { useEffect, useState } from 'react';
import styles from './BestProductSection.module.scss';
import ProductCard from './ProductCard';
import { getProducts } from '../services/productService';

// 좋아요가 많은 상품 네 개를 베스트 상품으로 보여 주는 영역
function BestProductSection() {
  // API에서 받아 온 베스트 상품 목록
  const [bestProducts, setBestProducts] = useState([]);

  useEffect(() => {
    // 컴포넌트가 처음 열릴 때만 좋아요순 상품을 요청
    const fetchBestProducts = async () => {
      try {
        const data = await getProducts({ pageSize: 4, orderBy: 'favorite' });
        setBestProducts(data.list);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBestProducts();
  }, []);

  return (
    <section className={styles.section}>
      <div className="container">
        <h2>베스트 상품</h2>
        <div className={styles.grid}>
          {bestProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BestProductSection;
