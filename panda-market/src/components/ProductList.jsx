import styles from './ProductList.module.scss';
import ProductCard from './ProductCard';

// 전달받은 상품 배열을 여러 개의 상품 카드로 렌더링
function ProductList({ products }) {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
