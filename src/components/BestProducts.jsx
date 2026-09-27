import useProducts from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import styles from "./BestProducts.module.scss";
import useDeviceType from "../hooks/useDeviceType";

function BestProducts() {
  const deviceType = useDeviceType();
  const pageSize = deviceType === "desktop" ? 4 : deviceType === "tablet" ? 2 : 1;
  
  const { products, isLoading } = useProducts({
    page: 1,
    pageSize,
    orderBy: "favorite",
    keyword: "",
  });
  
  
  return (
    <section className="best-products">
      <h2>베스트 상품</h2>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : (
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
