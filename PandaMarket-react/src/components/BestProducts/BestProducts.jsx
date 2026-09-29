import useProducts from "../../hooks/useProducts";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./BestProducts.module.scss";

function BestProducts() {
  const { products, isLoading, error } = useProducts({
    page: 1,
    pageSize: 4,
    orderBy: "favorite",
    keyword: "",
  });

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>베스트 상품</h2>

      {isLoading && <p className={styles.message}>상품을 불러오는 중입니다.</p>}

      {error && <p className={styles.error}>{error}</p>}

      {!isLoading && !error && (
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default BestProducts;
